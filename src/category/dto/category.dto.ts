import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoriesResponseDto {
  id: string;
  name: string;
  urlImage: string;
  pathName?: string;
  isArchived: boolean;
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  constructor(partial: Partial<CategoriesResponseDto>) {
    Object.assign(this, partial);
  }
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  urlImage: string;

  @IsOptional()
  @IsString()
  pathName?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  urlImage?: string;

  @IsOptional()
  @IsString()
  pathName?: string;
}
