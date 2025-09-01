import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
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

  async exportCategories(): Promise<Buffer> {
    // Lấy tất cả categories không bị archive
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
        null,
        HttpResultCode.NOT_FOUND,
        'No categories found to export',
      );
    }

    // Tạo workbook mới
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Categories');
    worksheet.views = [{ state: 'normal', zoomScale: 100 }];

    // Add Title
    worksheet.mergeCells('A1:G1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = `BÁO CÁO DANH SÁCH DANH MỤC SẢN PHẨM`;
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Add Header Row
    const headerRow = worksheet.addRow([
      'STT',
      'ID',
      'Tên danh mục',
      'URL hình ảnh',
      'Path Name',
      'Trạng thái',
      'Ngày tạo',
    ]);
    this.formatHeaderRow(headerRow);

    // Prepare data
    const data = categories.map((category, index) => ({
      stt: index + 1,
      id: category.id,
      name: category.name,
      urlImage: category.urlImage || 'N/A',
      pathName: category.pathName || 'N/A',
      status: category.isArchived ? 'Đã xóa' : 'Hoạt động',
      createdAt: new Date(category.createdAt).toLocaleDateString('vi-VN'),
    }));

    // Add Data Rows
    this.addDataRows(worksheet, data, [
      'id',
      'name',
      'urlImage',
      'pathName',
      'status',
      'createdAt',
    ]);

    // Adjust Column Widths
    worksheet.columns.forEach((column, index) => {
      if (index === 0)
        column.width = 8; // STT
      else if (index === 1)
        column.width = 40; // ID
      else if (index === 2)
        column.width = 25; // Name
      else if (index === 3)
        column.width = 30; // URL
      else column.width = 20; // Others
      column.alignment = { horizontal: 'left', vertical: 'middle' };
    });

    return Buffer.from(await workbook.xlsx.writeBuffer());
  }

  private addDataRows(sheet: ExcelJS.Worksheet, data: any[], fields: string[]) {
    data.forEach((item) => {
      const rowData = [item.stt];
      fields.forEach((field) => {
        rowData.push(item[field]);
      });
      const row = sheet.addRow(rowData);
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          left: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          right: { style: 'thin', color: { argb: 'FF000000' } },
        };
      });
    });
  }

  private formatHeaderRow(headerRow: ExcelJS.Row) {
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4472C4' }, // Blue background
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } },
      };
    });
  }
}
