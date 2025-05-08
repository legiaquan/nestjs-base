import { ValidationPipe as NestValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export class ValidationPipe extends NestValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      ...options,
    });
  }
}
