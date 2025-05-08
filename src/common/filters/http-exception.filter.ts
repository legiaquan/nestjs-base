import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exceptions/base.exception';
import { ErrorResponse } from '../responses/error.response';

interface HttpExceptionResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

interface RequestDetails {
  method: string;
  url: string;
  headers: Record<string, unknown>;
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestDetails: RequestDetails = {
      method: request.method,
      url: request.url,
      headers: request.headers as Record<string, unknown>,
      body: request.body as Record<string, unknown>,
      query: request.query as Record<string, unknown>,
      params: request.params as Record<string, unknown>,
    };

    console.error('ERROR:: exception::', exception);
    console.debug('DEBUG:: requestDetails:: ', requestDetails);

    let statusCode: number;
    let message: string;
    let error: string;
    let metadata: Record<string, unknown> | undefined;

    if (exception instanceof BaseException) {
      const exceptionResponse = exception.getResponse();
      statusCode = exceptionResponse.statusCode;
      message = exceptionResponse.message;
      error = exceptionResponse.error;
      metadata = exceptionResponse.metadata;
    } else if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as string | HttpExceptionResponse;
      statusCode = exception.getStatus();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse.message?.toString() || exception.message;
      error = exception.name;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      error = 'Internal Server Error';
    }

    const errorResponse = new ErrorResponse({
      error: message ?? error,
      statusCode,
      metadata: {
        path: request.url,
        method: request.method,
        ...metadata,
      },
    });

    response.status(statusCode).json(errorResponse);
  }
}
