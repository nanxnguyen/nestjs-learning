import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email người dùng',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mã tài khoản',
    example: '1234567890',
  })
  @IsString()
  clientCode: string;

  @ApiProperty({
    description: 'Tên người dùng',
    example: 'Nguyễn Văn A',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: 'Tên phải là chuỗi' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  @MaxLength(50, { message: 'Tên không được quá 50 ký tự' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  name: string;

  @ApiProperty({
    description: 'Số điện thoại người dùng',
    example: '0123456789',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\s/g, '') : value,
  )
  phone?: string;

  @ApiProperty({
    description: 'Địa chỉ',
    example: '1 ABCde, Quận ABC, TP.HCM',
  })
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Ảnh mặt trước',
    example: 'https://example.com/front-image.jpg',
  })
  @IsString()
  frontImage?: string;

  @ApiProperty({
    description: 'Ảnh mặt sau',
    example: 'https://example.com/back-image.jpg',
  })
  @IsString()
  backImage?: string;

  @ApiProperty({
    description: 'Ảnh chân dung',
    example: 'https://example.com/id-image.jpg',
  })
  @IsString()
  faceImage?: string;
}
