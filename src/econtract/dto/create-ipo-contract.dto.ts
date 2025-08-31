import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateIPORegistrationContractDto {
  @ApiProperty({
    description: 'ID của request',
    example: 'IPO_REQ_001',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Mã khách hàng',
    example: 'HSC001234',
  })
  @IsString()
  clientCode: string;

  @ApiProperty({
    description: 'URL tài liệu hợp đồng (PDF)',
    example: 'https://example.com/contract.pdf',
  })
  @IsString()
  documentUrl: string;
}

export class DataCreateContractDto {
  @ApiProperty({
    description: 'Envelope ID từ FPT',
    example: 'ENV_12345',
  })
  envelopeId: string;

  @ApiProperty({
    description: 'Status của contract',
    example: 'CREATED',
  })
  status: string;

  @ApiProperty({
    description: 'Response từ FPT',
    example: { message: 'Contract created successfully' },
  })
  response: any;
}

