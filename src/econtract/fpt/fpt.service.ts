import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';

// Types for FPT API
interface FPTContractResponse {
  contract_id?: string;
  id?: string;
  status?: string;
  signing_url?: string;
  created_at?: string;
  signed_at?: string;
  download_url?: string;
  envelopeId?: string;
  response?: any;
}

interface FPTAdvancedContractPayload {
  attrs: Record<string, any>;
  id: string;
  lookup: string;
  payload: string;
  body: {
    alias: string;
    refId: string;
    file: string; // Base64 PDF
    fileName: string;
    docTypeCode: number;
    headerFields: any[];
    parties: any[];
    relatedContract: any;
  };
  refId: string;
  selector: string;
}

@Injectable()
export class FptService {
  private readonly logger = new Logger(FptService.name);
  private readonly fptApiUrl: string;
  private readonly fptApiKey: string;

  // FPT Contract constants
  private readonly CONTRACT_DOCTYPE_CODE: string;
  private readonly SELECTOR_CREATE_CONTRACT: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Basic FPT Configuration
    this.fptApiUrl =
      this.configService.get<string>('FPT_API_URL') ||
      this.configService.get<string>('FPT_E_CONTRACT_URI') ||
      'https://demo.econtract.fpt.com/app/';
    this.fptApiKey =
      this.configService.get<string>('FPT_API_KEY') || 'your-fpt-api-key';

    // Advanced FPT Configuration
    this.CONTRACT_DOCTYPE_CODE =
      this.configService.get<string>('DOC_TYPE_CODE') ||
      this.configService.get<string>('FPT_CONTRACT_DOCTYPE_CODE') ||
      '1973';
    this.SELECTOR_CREATE_CONTRACT =
      this.configService.get<string>('SELECTOR_CREATE_CONTRACT') ||
      this.configService.get<string>('FPT_SELECTOR_CREATE_CONTRACT') ||
      'flow_start_hsc_create_auto_determine_econtract_integrate';
  }

  /**
   * Create IPO Registration Contract (without client info)
   */
  async createIPOContract(params: {
    id: string;
    clientCode: string;
    documentUrl: string;
    metadata?: Record<string, any>;
    convertB64FromUrl: (url: string) => Promise<string>;
  }): Promise<FPTContractResponse> {
    try {
      this.logger.log(`Creating IPO contract for client: ${params.clientCode}`);

      // Convert document URL to Base64
      const getContractTemplateBase64 = await params.convertB64FromUrl(
        params.documentUrl,
      );

      const contractName = `IPO-Registration-${params.clientCode}-${dayjs().format('DD/MM/YYYY-hh:mm:ss')}.pdf`;
      const contractDate = moment().format('DD/MM/YYYY');
      const isoDate = moment().format('YYYY-MM-DD');

      // Template header fields
      const headerFields = [
        {
          id: 'headerName',
          name: 'contractTitle',
          type: 'string',
          value: `HĐ đăng ký đấu giá IPO ${contractDate}`,
        },
        {
          id: 'headerNo',
          name: 'contractNumber',
          type: 'string',
          value: contractName,
        },
        {
          id: 'headerDate',
          name: 'contractDate',
          type: 'date',
          value: isoDate,
        },
        {
          id: 'envType',
          name: 'typeRegister',
          type: 'string',
          value: 'IPO-Registration',
        },
      ];

      // Template parties (HSC as company)
      const parties = [
        {
          id: 'p_001',
          isMyOrg: true,
          isOrg: true,
          orgName: 'HSC Securities Corporation',
          order: 0,
          recipients: [
            {
              isEsign: true,
              recipientId: 'p_001_r_001',
              email:
                this.configService.get<string>('EMAIL_ORGANIZATION') ||
                this.configService.get<string>('FPT_EMAIL_ORGANIZATION') ||
                'anh.nh@hsc.com.vn',
              personalName:
                this.configService.get<string>('PERSONAL_NAME') ||
                this.configService.get<string>('FPT_PERSONAL_NAME') ||
                'Nguyen Hoang Anh',
              telephoneNumber:
                this.configService.get<string>('TELEPHONE_ORGANIZATION') ||
                this.configService.get<string>('FPT_TELEPHONE_ORGANIZATION') ||
                '0966941840',
              contactId:
                this.configService.get<string>('CONTRACT_ID') ||
                this.configService.get<string>('FPT_CONTRACT_ID') ||
                'HCSTEST',
              role: 'company',
              order: 1,
              notifyTypes: [
                this.configService.get<string>('TYPE_NOTI_EMAIL') ||
                  this.configService.get<string>('FPT_TYPE_NOTI_EMAIL') ||
                  'email_econtract',
              ],
              signTypes: ['digital'],
              fields: [],
              location: 'Ho Chi Minh City',
              stateOrProvince: 'Ho Chi Minh',
              country: 'VN',
              personalID: '',
              passportID: '',
              type: 'COMPANY',
              messageType: 'EXPLICIT',
              photoIDCard: null,
              photoIDCardContentType: null,
              statusCode: '0',
              resourceType: 'internal',
              refId:
                this.configService.get<string>('CONTRACT_ID') ||
                this.configService.get<string>('FPT_CONTRACT_ID') ||
                'HCSTEST',
            },
          ],
        },
      ];

      const payload: FPTAdvancedContractPayload = {
        attrs: {},
        id: `${params.clientCode}-${dayjs().format('DD/MM/YYYY-hh:mm:ss')}`,
        lookup: `${params.clientCode}-${dayjs().format('DD/MM/YYYY-hh:mm:ss')}`,
        payload: '',
        body: {
          alias: '',
          refId: `${params.clientCode}-${dayjs().format('DD/MM/YYYY-hh:mm:ss')}`,
          file: getContractTemplateBase64,
          fileName: 'contractClientPartner.pdf',
          docTypeCode: Number(this.CONTRACT_DOCTYPE_CODE),
          headerFields,
          parties,
          relatedContract: null,
        },
        refId: `${params.clientCode}-${dayjs().format('DD/MM/YYYY-hh:mm:ss')}`,
        selector: this.SELECTOR_CREATE_CONTRACT,
      };

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.fptApiUrl}${this.configService.get<string>('CONTRACT_CREATE') || 'services/excall/api/excall'}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${this.fptApiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      // Extract envelopeId from response
      const envelopeId = response.data?.response?.envelopeId;

      if (!envelopeId) {
        this.logger.error(
          `Error response contract from FPT ${params.id}`,
          JSON.stringify(response.data),
        );
        throw new Error(`Failed to get envelopeId from FPT response`);
      }

      this.logger.log(
        `Create IPO contract FPT success with envelopeId: ${envelopeId}`,
      );

      return {
        ...response.data,
        envelopeId,
        contract_id: envelopeId,
        id: envelopeId,
      } as FPTContractResponse;
    } catch (error: any) {
      this.logger.error(
        `Failed to create IPO contract: ${error?.message || 'Unknown error'}`,
      );
      throw this.handleFptError(error);
    }
  }

  /**
   * Handle FPT API errors with proper typing
   */
  private handleFptError(error: any): Error {
    if (error?.response) {
      const status = error.response.status || 500;
      const message =
        error.response.data?.message || error.message || 'FPT API Error';
      const fptError = new Error(`FPT API Error (${status}): ${message}`);
      (fptError as any).status = status;
      (fptError as any).response = error.response;
      return fptError;
    }

    return new Error(error?.message || 'Unknown FPT service error');
  }
}
