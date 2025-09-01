import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomResponse } from '../constants/global/respone';
import { HttpResultCode } from '../constants/enums/http';

@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveImages(imageUrls: string[], tag: string) {
    try {
      const imageData = imageUrls.map((url) => ({
        urlImage: `/images/${url}`,
        tag,
      }));
      const createdImages = await Promise.all(
        imageData.map((image) =>
          this.prismaService.upload.create({ data: image }),
        ),
      );
      return new CustomResponse(
        { result: createdImages },
        HttpResultCode.OK,
        null,
      );
    } catch (error) {
      throw new CustomResponse([], HttpResultCode.NOT_FOUND, error);
    }
  }

  async getImages(tag: string) {
    try {
      const imageData = await this.prismaService.upload.findMany({
        where: {
          tag: tag,
        },
      });
      return new CustomResponse({ result: imageData }, HttpResultCode.OK, null);
    } catch (error) {
      throw new CustomResponse([], HttpResultCode.NOT_FOUND, error);
    }
  }
}
