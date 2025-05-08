import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(private readonly logger: Logger) {}

  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, ...optionalParams);
  }
}
