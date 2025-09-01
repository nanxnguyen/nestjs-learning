import { Injectable } from '@nestjs/common';
import { HttpResultCode } from 'src/constants/enums/http';
import {
  CustomResponse,
  HttpInternalServerError,
  HttpNotFound,
} from 'src/constants/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommonService {
  constructor(private readonly prismaService: PrismaService) {}
  async getProvinces() {
    try {
      const response = await this.prismaService.provinces.findMany();
      
      return new CustomResponse(response, HttpResultCode.OK, null);
    } catch (error) {
      throw new HttpInternalServerError(
        'Failed to get provinces',
        HttpResultCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDistricts() {
    try {
      const response = await this.prismaService.districts.findMany();
      return new CustomResponse(response, HttpResultCode.OK, null);
    } catch (error) {
      throw new HttpInternalServerError(
        'Failed to get districts',
        HttpResultCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getWards() {
    try {
      const response = await this.prismaService.wards.findMany();
      return new CustomResponse(response, HttpResultCode.OK, null);
    } catch (error) {
      throw new HttpInternalServerError(
        'Failed to get wards',
        HttpResultCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getDistrictsByProvinceCode(provinceCode: string) {
    try {
      const response = await this.prismaService.districts.findMany({
        where: { provinceCode },
      });

      if (response.length === 0) {
        throw new HttpNotFound(
          'No districts found for this province code',
          HttpResultCode.NOT_FOUND,
        );
      }
      return new CustomResponse(response, HttpResultCode.OK, null);
    } catch (error) {
      throw new HttpInternalServerError(
        'Failed to get districts by province code',
        HttpResultCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getWardsByDistrictCode(districtCode: string) {
    try {
      const response = await this.prismaService.wards.findMany({
        where: { districtCode },
      });
    } catch (error) {
      throw new HttpInternalServerError(
        'Failed to get wards by district code',
        HttpResultCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
