import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EcontractController } from './econtract.controller';
import { EcontractService } from './econtract.service';
import { FptService } from './fpt/fpt.service';
import { FileConverterService } from './utils/file-converter.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000, // 30 seconds timeout
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  controllers: [EcontractController],
  providers: [EcontractService, FptService, FileConverterService],
  exports: [EcontractService, FptService, FileConverterService],
})
export class EcontractModule {}
