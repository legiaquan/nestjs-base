import { HealthResponse } from '@/common/responses/health.response';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check application health' })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/HealthResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'Health check completed successfully',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            status: 'healthy',
            version: '1.0.0',
            timestamp: '2024-04-15T10:00:00.000Z',
            uptime: 3600,
            memory: {
              rss: 12345678,
              heapTotal: 12345678,
              heapUsed: 12345678,
              external: 12345678,
            },
            database: {
              status: 'connected',
              responseTime: 10,
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 503, description: 'Application is unhealthy' })
  async checkHealth() {
    const healthData = await this.healthService.checkHealth();
    return new HealthResponse({
      data: {
        status: 'healthy',
        version: process.env.npm_package_version || '1.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        database: {
          status: healthData.database,
          responseTime: 0,
        },
      },
      metadata: healthData,
    });
  }

  @Get('ping')
  @ApiOperation({ summary: 'Simple ping endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Pong response',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/HealthResponse',
        },
        example: {
          status: 'success',
          statusCode: 200,
          message: 'pong',
          timestamp: '2024-04-15T10:00:00.000Z',
          data: {
            status: 'healthy',
            version: '1.0.0',
            timestamp: '2024-04-15T10:00:00.000Z',
            uptime: 3600,
            memory: {
              rss: 12345678,
              heapTotal: 12345678,
              heapUsed: 12345678,
              external: 12345678,
            },
            database: {
              status: 'connected',
              responseTime: 0,
            },
          },
        },
      },
    },
  })
  ping() {
    return new HealthResponse({
      data: {
        status: 'healthy',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        database: {
          status: 'connected',
          responseTime: 0,
        },
      },
      message: 'pong',
    });
  }
}
