import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
}
