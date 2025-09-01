import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonService } from './common.service';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  // Get all provinces
  @Get('provinces')
  @ApiOperation({ summary: 'Get all provinces' })
  @ApiResponse({ status: 200, description: 'Get all provinces successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getProvinces() {
    return this.commonService.getProvinces();
  }

  // Get all districts

  @Get('districts')
  @ApiOperation({ summary: 'Get all districts' })
  @ApiResponse({ status: 200, description: 'Get all districts successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getDistricts() {
    return this.commonService.getDistricts();
  }

  // Get all wards
  @Get('wards')
  @ApiOperation({ summary: 'Get all wards' })
  @ApiResponse({ status: 200, description: 'Get all wards successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getWards() {
    return this.commonService.getWards();
  }

  // Get all districts by province code
  @Get('districts/:provinceCode')
  @ApiOperation({ summary: 'Get all districts by province code' })
  @ApiResponse({
    status: 200,
    description: 'Get all districts by province code successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getDistrictsByProvinceCode(
    @Param('provinceCode') provinceCode: string,
  ) {
    return this.commonService.getDistrictsByProvinceCode(provinceCode);
  }

  // Get all wards by district code
  @Get('wards/:districtCode')
  @ApiOperation({ summary: 'Get all wards by district code' })
  @ApiResponse({
    status: 200,
    description: 'Get all wards by district code successfully',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getWardsByDistrictCode(@Param('districtCode') districtCode: string) {
    return this.commonService.getWardsByDistrictCode(districtCode);
  }
}
