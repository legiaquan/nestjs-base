export interface BaseResponseOptions {
  status: string;
  statusCode?: number;
  metadata?: Record<string, any>;
}

export class BaseResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  requestId?: string;
  metadata?: Record<string, any>;

  constructor(options: BaseResponseOptions) {
    this.status = options.status;
    this.statusCode = options.statusCode || 200;
    this.timestamp = new Date().toISOString();
    this.metadata = options.metadata;
  }
}
