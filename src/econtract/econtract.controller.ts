import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateIPORegistrationContractDto,
  DataCreateContractDto,
} from './dto/create-ipo-contract.dto';
import { EcontractService } from './econtract.service';

@ApiTags('econtract')
@Controller('econtract')
export class EcontractController {
  constructor(private readonly econtractService: EcontractService) {}

  @Post('ipo')
  @ApiOperation({
    summary: 'Tạo hợp đồng IPO Registration',
    description: 'Tạo hợp đồng đăng ký đấu giá IPO từ document URL',
  })
  @ApiBody({ type: CreateIPORegistrationContractDto })
  @ApiResponse({
    status: 201,
    description: 'Hợp đồng IPO được tạo thành công',
    type: DataCreateContractDto,
    schema: {
      example: {
        envelopeId: 'ENV_IPO_12345',
        status: 'CREATED',
        response: {
          message: 'IPO contract created successfully',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 500, description: 'Lỗi từ FPT services' })
  createIPOContract(
    @Body() createIPOContractDto: CreateIPORegistrationContractDto,
  ) {
    return this.econtractService.createIPOContract(createIPOContractDto);
  }
}
