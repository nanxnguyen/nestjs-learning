import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CustomResponse } from '../constants/global/respone';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@ApiTags('B2C')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  })
  @Post('latest')
  async getCategoryById(@Body('id', new ParseUUIDPipe()) id: string) {
    return await this.categoryService.getCategoryById(id);
  }

  @Post(':storeId/create')
  async createCategory(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body() data: CreateCategoryDto,
  ) {
    return await this.categoryService.createCategory(data, storeId);
  }

  @Patch(':id/update')
  async updateCategoryById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.categoryService.deleteCategory(id);
  }

  @Post('export')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @ApiResponse({
    status: 200,
    description: 'Export categories to Excel file',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async exportCategories(@Res() res: Response) {
    try {
      const buffer = await this.categoryService.exportCategories();
      const filename = `categories_export_${new Date().toISOString().split('T')[0]}.xlsx`;

      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length,
      });

      res.send(buffer);
    } catch (error) {
      if (error instanceof CustomResponse) {
        res.status(400).json(error);
      } else {
        res.status(500).json({
          statusCode: 500,
          message: 'Failed to export categories',
          error: error.message,
        });
      }
    }
  }
}
