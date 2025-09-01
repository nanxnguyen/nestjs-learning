import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuid } from 'uuid';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 5 }], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder = req.query.folder || 'default';
          if (typeof folder === 'string') {
            const uploadPath = join(
              process.env.STORAGE_ASSETS || './uploads',
              '/images',
              folder,
            );
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
          }
        },
        // filename: (req, file, cb) => {
        //   const fileName = `${uuid}`;
        //   cb(null, fileName);
        // },

        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const fileName = `${uuid()}${ext}`; // Final file name
          cb(null, fileName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    type: 'string',
    required: false,
    description:
      'Thư mục động để lưu trữ file. Mặc định là "default" nếu không có thư mục được cung cấp.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Ảnh  cần upload',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Tải file thành công',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          description: 'URL của ảnh  đã upload',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
    @Query('folder') folder: string,
  ) {
    const imageUrls =
      files.image?.map((file) => `${folder}/${file.filename}`) || [];
    return await this.uploadService.saveImages(imageUrls, folder);
  }

  @ApiQuery({
    name: 'folder',
    type: 'string',
    required: false,
  })
  @Get('files')
  async getFiles(@Query('folder') folder: string) {
    return await this.uploadService.getImages(folder);
  }
}
