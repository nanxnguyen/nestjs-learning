import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  CreateIPORegistrationContractDto,
  DataCreateContractDto,
} from './dto/create-ipo-contract.dto';
import { FptService } from './fpt/fpt.service';
import { FileConverterService } from './utils/file-converter.service';

@Injectable()
export class EcontractService {
  private readonly logger = new Logger(EcontractService.name);

  constructor(
    private readonly fptService: FptService,
    private readonly fileConverterService: FileConverterService,
  ) {}

  /**
   * Tạo hợp đồng IPO Registration (không có thông tin khách hàng)
   */
  async createIPOContract(
    createIPOContractDto: CreateIPORegistrationContractDto,
  ): Promise<DataCreateContractDto> {
    try {
      this.logger.log(
        `Creating IPO contract for client: ${createIPOContractDto.clientCode}`,
      );

      // Convert document URL to Base64 using FileConverterService
      const convertB64FromUrl =
        this.fileConverterService.convertB64FromUrl.bind(
          this.fileConverterService,
        );

      const response = await this.fptService.createIPOContract({
        ...createIPOContractDto,
        convertB64FromUrl,
      });

      // Extract envelopeId from response
      const envelopeId =
        response.envelopeId || response.contract_id || response.id;

      if (!envelopeId) {
        this.logger.error(
          `Error response contract from FPT ${createIPOContractDto.id}`,
          JSON.stringify(response),
        );
        throw new HttpException(
          'Failed to get envelopeId from FPT response',
          HttpStatus.BAD_REQUEST,
        );
      }

      this.logger.log(
        `Create IPO contract FPT success with envelopeId: ${envelopeId}`,
      );

      return {
        envelopeId,
        status: 'CREATED',
        response: response,
      };
    } catch (error: any) {
      this.logger.error(
        `Failed to create IPO contract: ${error?.message || 'Unknown error'}`,
      );
      throw this.handleServiceError(error, 'create IPO contract');
    }
  }

  /**
   * Handle service errors with proper typing
   */
  private handleServiceError(error: any, operation: string): HttpException {
    // Nếu là lỗi từ FPT API (có status)
    if (error?.status) {
      return new HttpException(
        `FPT API Error: ${error?.message || 'Unknown error'}`,
        error.status,
      );
    }

    // Nếu là lỗi network hoặc service
    return new HttpException(
      `Failed to ${operation} with FPT services`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
