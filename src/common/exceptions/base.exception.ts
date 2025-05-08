export interface ExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
  metadata?: Record<string, unknown>;
}

export abstract class BaseException extends Error {
  abstract statusCode: number;
  abstract error: string;
  metadata?: Record<string, unknown>;

  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message);
    this.metadata = metadata;
  }

  getResponse(): ExceptionResponse {
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: this.error,
      ...(this.metadata && { metadata: this.metadata }),
    };
  }
}
