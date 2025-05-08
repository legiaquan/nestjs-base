import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  statusCode = HttpStatus.NOT_FOUND;
  error = 'Not Found';

  constructor(message: string = 'Resource not found', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}

export class BadRequestException extends BaseException {
  statusCode = HttpStatus.BAD_REQUEST;
  error = 'Bad Request';

  constructor(message: string = 'Invalid request', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}

export class UnauthorizedException extends BaseException {
  statusCode = HttpStatus.UNAUTHORIZED;
  error = 'Unauthorized';

  constructor(message: string = 'Unauthorized access', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}

export class ForbiddenException extends BaseException {
  statusCode = HttpStatus.FORBIDDEN;
  error = 'Forbidden';

  constructor(message: string = 'Access forbidden', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}

export class ConflictException extends BaseException {
  statusCode = HttpStatus.CONFLICT;
  error = 'Conflict';

  constructor(message: string = 'Resource conflict', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}

export class InternalServerErrorException extends BaseException {
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  error = 'Internal Server Error';

  constructor(message: string = 'Internal server error', metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}
