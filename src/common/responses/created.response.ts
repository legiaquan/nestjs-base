import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { CreatedResponseType } from '@/common/interfaces/response.interface';
import { BaseResponse } from './base.response';

export interface CreatedResponseOptions<T> extends Partial<CreatedResponseType> {
  data?: T;
}

export class CreatedResponse<T> extends BaseResponse {
  data?: T;
  message: string;
  statusCode: number;

  constructor({
    data,
    message = ReasonPhrases.CREATED,
    statusCode = StatusCodes.CREATED,
    metadata = {},
  }: CreatedResponseOptions<T>) {
    super({ status: 'Created', metadata });
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}
