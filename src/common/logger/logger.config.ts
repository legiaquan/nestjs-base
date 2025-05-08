import { RequestMethod } from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { Params } from 'nestjs-pino';

const isLambda = !!process.env.LAMBDA_TASK_ROOT;

export const loggerConfig: Params = {
  pinoHttp: {
    level: process.env.LOG_LEVEL || 'info',
    transport: isLambda
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: process.env.NODE_ENV !== 'production',
            levelFirst: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
    customProps: () => ({
      context: 'HTTP',
      environment: process.env.NODE_ENV || 'development',
      service: 'nestjs-base-api',
    }),
    serializers: {
      req: (req: IncomingMessage) => ({
        id: (req as any).id,
        method: req.method,
        url: req.url,
        query: (req as any).query,
        params: (req as any).params,
        body: (req as any).body,
        headers: {
          'user-agent': req.headers['user-agent'],
          'x-forwarded-for': req.headers['x-forwarded-for'],
          'x-real-ip': req.headers['x-real-ip'],
        },
      }),
      res: (res: ServerResponse) => ({
        statusCode: res.statusCode,
        message: res.statusMessage || (res.statusCode >= 400 ? 'Error occurred' : 'Success'),
      }),
      err: (err: Error) => ({
        type: err.name,
        message: err.message,
        stack: err.stack,
      }),
    },
    customLogLevel: (_req: IncomingMessage, res: ServerResponse, err?: Error) => {
      if (res.statusCode >= 500 || err) {
        return 'error';
      }
      if (res.statusCode >= 400) {
        return 'warn';
      }
      return 'info';
    },
    customSuccessMessage: (req: IncomingMessage, res: ServerResponse) => {
      return `Request completed - ${req.method} ${req.url} ${res.statusCode} - ${res.statusMessage || 'Success'}`;
    },
    customErrorMessage: (req: IncomingMessage, res: ServerResponse, err: Error) => {
      return `Request failed - ${req.method} ${req.url} ${res.statusCode} - ${err?.message || res.statusMessage || 'Error occurred'}`;
    },
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.confirmPassword',
        'req.body.token',
        'req.body.refreshToken',
      ],
      censor: '**REDACTED**',
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    formatters: {
      level: (label: string) => {
        return { level: label.toUpperCase() };
      },
    },
  },
  exclude: [
    { method: RequestMethod.ALL, path: 'health' },
    { method: RequestMethod.ALL, path: 'favicon.ico' },
  ],
};
