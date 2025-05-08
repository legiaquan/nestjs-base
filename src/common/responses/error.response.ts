import { StatusCodes } from 'http-status-codes';

import { BaseResponse } from './base.response';

export interface ErrorResponseOptions {
  error: string;
  statusCode?: number;
  metadata?: Record<string, unknown>;
}

export class ErrorResponse extends BaseResponse {
  error: string;
  statusCode: number;

  constructor({
    error,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    metadata = {},
  }: ErrorResponseOptions) {
    super({ status: 'error', metadata });
    this.error = error;
    this.statusCode = statusCode;
  }
}
