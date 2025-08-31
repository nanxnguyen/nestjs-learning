import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use(cookieParser.default());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Xóa các property không có trong DTO
      forbidNonWhitelisted: true, // Trả lỗi nếu có property thừa
      transform: true, // Tự động transform data types
      transformOptions: {
        enableImplicitConversion: true, // Convert string -> number/boolean
      },
    }),
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // 📚 Setup Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Learn I Like API')
    .setDescription(
      'API Documentation cho dự án Learn I Like với NestJS + Prisma + PostgreSQL',
    )
    .setVersion('1.0')
    .addBearerAuth() // Thêm authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Lưu token authorization
    },
    customSiteTitle: 'Learn I Like API Docs',
  });

  const port = parseInt(process.env.PORT || '3332');

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/api`);
  console.log(`📊 Health: http://localhost:${port}/health`);
  console.log(`🍪 Cookie parser enabled`);
  console.log(`✅ ValidationPipe enabled`);
  console.log(`📖 Swagger docs ready!`);
}

bootstrap();
