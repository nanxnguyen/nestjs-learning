import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { EcontractModule } from './econtract/econtract.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),
    PrismaModule,
    // UsersModule,
    EcontractModule,
    CategoryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Luồng xử lý request
// Request → AuthGuard (kiểm tra quyền)
// → UserInterceptor (xử lý user info)
// → Controller/Service (logic nghiệp vụ)
// → CustomResponseFilter (format response)
// → ErrorMiddleware (xử lý lỗi nếu có)
// → Response trả về client
