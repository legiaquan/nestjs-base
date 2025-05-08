import { StatusCodes } from 'http-status-codes';
import { BaseResponse } from './base.response';

export interface HealthResponseOptions {
  data: {
    status: string;
    version: string;
    timestamp: string;
    uptime: number;
    memory: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
      external: number;
    };
    database: {
      status: string;
      responseTime: number;
    };
  };
  message?: string;
  statusCode?: number;
  metadata?: Record<string, any>;
}

export class HealthResponse extends BaseResponse {
  data: HealthResponseOptions['data'];
  message: string;

  constructor(options: HealthResponseOptions) {
    super({
      status: 'success',
      statusCode: options.statusCode || StatusCodes.OK,
      metadata: options.metadata,
    });
    this.data = options.data;
    this.message = options.message || 'Health check completed successfully';
  }
}
