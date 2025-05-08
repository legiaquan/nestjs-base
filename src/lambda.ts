import serverlessExpress from '@codegenie/serverless-express';
import { ValidationPipe } from '@nestjs/common';
import { Callback, Context, Handler } from 'aws-lambda';
import cookieParser from 'cookie-parser';
import { RequestListener } from 'http';

import { createAppInstance, setupMiddleware } from './app';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await createAppInstance();

  setupMiddleware(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.init();

  const expressInstance = app.getHttpAdapter().getInstance() as RequestListener;
  return serverlessExpress({ app: expressInstance });
}

// AWS Lambda handler function
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
): Promise<any> => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
