import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Hello World endpoint' })
  @ApiResponse({ status: 200, description: 'Returns Hello World message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Application and database health status',
    schema: {
      example: {
        status: 'OK',
        database: 'Connected',
        timestamp: '2025-08-30T18:00:00.000Z',
      },
    },
  })
  async getHealth() {
    const isHealthy = await this.prisma.isHealthy();
    return {
      status: isHealthy ? 'OK' : 'ERROR',
      database: isHealthy ? 'Connected' : 'Disconnected',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('posts')
  @ApiOperation({ summary: 'Get all posts with authors' })
  @ApiResponse({
    status: 200,
    description: 'List of all posts with author information',
    schema: {
      example: [
        {
          id: 1,
          title: 'Sample Post',
          content: 'This is a sample post content',
          published: true,
          authorId: 1,
          author: {
            id: 1,
            email: 'author@example.com',
            name: 'Author Name',
          },
          createdAt: '2025-08-30T18:00:00.000Z',
          updatedAt: '2025-08-30T18:00:00.000Z',
        },
      ],
    },
  })
  async getPosts() {
    return this.prisma.post.findMany({
      include: { author: true },
    });
  }
}
