import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { loggerConfig } from './logger/logger.config';
import { LoggerService } from './services/logger.service';

@Global()
@Module({
  imports: [PinoLoggerModule.forRoot(loggerConfig)],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
