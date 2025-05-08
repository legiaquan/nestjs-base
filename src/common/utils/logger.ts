import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private static instance: CustomLoggerService;

  private constructor(context?: string) {
    super(context ?? '');
  }

  static getInstance(context?: string): CustomLoggerService {
    if (!CustomLoggerService.instance) {
      CustomLoggerService.instance = new CustomLoggerService(context);
    }
    return CustomLoggerService.instance;
  }

  error(message: string, stack?: string, context?: string): void {
    const formattedMessage = this.formatMessage('ERROR', message, context);
    super.error(formattedMessage, stack);
  }

  warn(message: string, context?: string): void {
    const formattedMessage = this.formatMessage('WARN', message, context);
    super.warn(formattedMessage);
  }

  log(message: string, context?: string): void {
    const formattedMessage = this.formatMessage('INFO', message, context);
    super.log(formattedMessage);
  }

  debug(message: string, context?: string): void {
    const formattedMessage = this.formatMessage('DEBUG', message, context);
    super.debug(formattedMessage);
  }

  verbose(message: string, context?: string): void {
    const formattedMessage = this.formatMessage('VERBOSE', message, context);
    super.verbose(formattedMessage);
  }

  protected formatMessage(level: string, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const levelColor = this.getLevelColor(level);
    const contextStr = context ? `[${context}]` : '';

    return `${levelColor}[${timestamp}] ${level} ${contextStr} ${message}\x1b[0m`;
  }

  private getLevelColor(level: string): string {
    switch (level) {
      case 'ERROR':
        return '\x1b[31m'; // Red
      case 'WARN':
        return '\x1b[33m'; // Yellow
      case 'INFO':
        return '\x1b[32m'; // Green
      case 'DEBUG':
        return '\x1b[36m'; // Cyan
      case 'VERBOSE':
        return '\x1b[35m'; // Magenta
      default:
        return '\x1b[0m'; // Reset
    }
  }
}
