import { Injectable } from '@nestjs/common';
import { urlAssets } from '../config/env';
import { HttpResultCode } from '../constants/enums/http';
import { CustomResponse } from '../constants/global/respone';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService, // inject prisma service or create instance of prisma service
  ) {}

  async getAllCategories() {
    const categories = await this.prismaService.category.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (categories.length === 0) {
      throw new CustomResponse(
        [],
        HttpResultCode.NOT_FOUND,
        'No category found',
      );
    } else {
      const result = categories.map((category) => ({
        ...category,
        urlAssets,
      }));

      // set categories to redisCache
      // await this.redisService.setValueToList(
      //   'admincategories',
      //   JSON.stringify(result),
      // );
      return new CustomResponse(result, HttpResultCode.OK, null);
    }
    // }
  }
  async getCategoryById(id: string) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) {
      throw new CustomResponse(
        [],
        HttpResultCode.NOT_FOUND,
        'Category not found',
      );
    } else {
      return new CustomResponse(
        { ...category, urlAssets: urlAssets },
        HttpResultCode.OK,
        null,
      );
      // }
    }
  }
  // // create category
  async createCategory(data: CreateCategoryDto, storeId: string) {
    try {
      const category = await this.prismaService.category.create({
        data: {
          name: data.name,
          urlImage: data.urlImage,
          pathName: data.pathName,
        },
        select: {
          id: true,
        },
      });
      return new CustomResponse(
        category,
        HttpResultCode.OK,
        'Category created successfully',
      );
    } catch (error) {
      throw new CustomResponse(
        null,
        HttpResultCode.INTERNAL_SERVER_ERROR,
        'Failed to create category: ' + error.message,
      );
    }
  }
  // // update category
  async updateCategory(id: string, data: UpdateCategoryDto) {
    try {
      // Check if category exists first
      const existingCategory = await this.prismaService.category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        throw new CustomResponse(
          null,
          HttpResultCode.NOT_FOUND,
          'Category not found',
        );
      }

      // Build update data object only with provided fields
      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.urlImage !== undefined) updateData.urlImage = data.urlImage;
      if (data.pathName !== undefined) updateData.pathName = data.pathName;

      const updatedCategory = await this.prismaService.category.update({
        where: {
          id: id,
        },
        data: updateData,
      });
      return new CustomResponse(
        updatedCategory,
        HttpResultCode.OK,
        'Category updated successfully',
      );
    } catch (error) {
      if (error instanceof CustomResponse) {
        throw error;
      }
      throw new CustomResponse(
        null,
        HttpResultCode.INTERNAL_SERVER_ERROR,
        'Failed to update category: ' + error.message,
      );
    }
  }
  // // delete category (soft delete)
  async deleteCategory(id: string) {
    try {
      // Check if category exists and is not already archived
      const existingCategory = await this.prismaService.category.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        throw new CustomResponse(
          null,
          HttpResultCode.NOT_FOUND,
          'Category not found',
        );
      }

      if (existingCategory.isArchived) {
        throw new CustomResponse(
          null,
          HttpResultCode.BAD_REQUEST,
          'Category is already deleted',
        );
      }

      const category = await this.prismaService.category.update({
        where: {
          id: id,
        },
        data: {
          isArchived: true,
        },
      });

      return new CustomResponse(
        category,
        HttpResultCode.OK,
        'Category deleted successfully',
      );
    } catch (error) {
      if (error instanceof CustomResponse) {
        throw error;
      }
      throw new CustomResponse(
        null,
        HttpResultCode.INTERNAL_SERVER_ERROR,
        'Failed to delete category: ' + error.message,
      );
    }
  }
}
