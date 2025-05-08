import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from '../responses/base.response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse> {
    return next.handle().pipe(
      map((data: unknown) => {
        const response = context.switchToHttp().getResponse<Response>();

        if (data instanceof BaseResponse) {
          response.status(data.statusCode || 200);
        }

        return data as BaseResponse;
      }),
    );
  }
}
