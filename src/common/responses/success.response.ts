import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { SuccessResponseType } from '../interfaces/response.interface';
import { BaseResponse } from './base.response';

export interface SuccessResponseOptions<T> extends Partial<SuccessResponseType> {
  data?: T;
}

export class SuccessResponse<T> extends BaseResponse {
  data?: T;
  message: string;
  statusCode: number;
  metadata?: Record<string, any>;
  constructor({
    data,
    message = ReasonPhrases.OK,
    statusCode = StatusCodes.OK,
    metadata = {},
  }: SuccessResponseOptions<T>) {
    super({ status: 'success', metadata });
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}
