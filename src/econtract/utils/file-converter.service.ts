import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileConverterService {
  private readonly logger = new Logger(FileConverterService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * Convert file from URL to Base64
   */
  async convertB64FromUrl(url: string): Promise<string> {
    try {
      this.logger.log(`Converting file from URL to Base64: ${url}`);

      const response = await firstValueFrom(
        this.httpService.get(url, {
          responseType: 'arraybuffer',
          timeout: 30000,
        }),
      );

      const buffer = Buffer.from(response.data);
      const base64 = buffer.toString('base64');
      
      // Detect content type from response headers or URL extension
      const contentType = response.headers['content-type'] || this.getContentTypeFromUrl(url);
      
      const base64WithPrefix = `data:${contentType};base64,${base64}`;

      this.logger.log(`Successfully converted file to Base64, size: ${base64.length} characters`);
      
      return base64WithPrefix;
    } catch (error: any) {
      this.logger.error(`Failed to convert file from URL: ${error?.message || 'Unknown error'}`);
      throw new Error(`Failed to convert file from URL: ${url}`);
    }
  }

  /**
   * Get content type from URL extension
   */
  private getContentTypeFromUrl(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      txt: 'text/plain',
    };

    return mimeTypes[extension || ''] || 'application/octet-stream';
  }

  /**
   * Convert file buffer to Base64
   */
  convertBufferToBase64(buffer: Buffer, contentType: string = 'application/pdf'): string {
    const base64 = buffer.toString('base64');
    return `data:${contentType};base64,${base64}`;
  }

  /**
   * Extract Base64 content from data URL
   */
  extractBase64Content(dataUrl: string): string {
    if (dataUrl.includes(',')) {
      return dataUrl.split(',')[1];
    }
    return dataUrl;
  }
}

