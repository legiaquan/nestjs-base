import { APIGatewayEvent } from 'aws-lambda';

export interface ServerlessGlobal {
  serverless?: {
    event: APIGatewayEvent;
  };
}
