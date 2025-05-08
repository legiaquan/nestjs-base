import { StatusCodes } from 'http-status-codes';

import { BaseResponse } from './base.response';

export interface PaginationMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponseOptions<T> {
  data: T[];
  pagination: PaginationMetadata;
  message?: string;
  statusCode?: number;
  metadata?: Record<string, unknown>;
}

export class PaginatedResponse<T> extends BaseResponse {
  data: T[];
  pagination: PaginationMetadata;
  message: string;
  statusCode: number;

  constructor({
    data,
    pagination,
    message = 'Success',
    statusCode = StatusCodes.OK,
    metadata = {},
  }: PaginatedResponseOptions<T>) {
    super({ status: 'success', statusCode, metadata });
    this.data = data;
    this.pagination = pagination;
    this.message = message;
    this.statusCode = statusCode;
  }
}
