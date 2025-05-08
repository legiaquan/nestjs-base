import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      res.locals.responseTime = duration;
    });
    next();
  }
}
