import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CustomLoggerService } from '../common/utils/logger';

const logger = CustomLoggerService.getInstance('MongoDB');
const isProduction = process.env.NODE_ENV === 'production';

export const mongooseConfig = (uri: string): MongooseModuleOptions => {
  return {
    uri,
    connectionFactory: (connection: Connection) => {
      connection.on('connected', () => {
        logger.log('MongoDB connected successfully');
        if (!isProduction) {
          logger.debug(
            `MongoDB connected to ${connection.host}:${connection.port}/${connection.name}`,
          );
        }
      });

      connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
        if (!isProduction) {
          logger.debug(
            `MongoDB disconnected from ${connection.host}:${connection.port}/${connection.name}`,
          );
        }
      });

      connection.on('error', (error: Error) => {
        logger.error('MongoDB connection error:', error.stack);
        if (!isProduction) {
          logger.debug(`MongoDB error on ${connection.host}:${connection.port}/${connection.name}`);
        }
      });

      // Add debug event listeners for non-production
      if (!isProduction) {
        connection.on('reconnected', () => {
          logger.log('MongoDB reconnected');
          logger.debug(
            `MongoDB reconnected to ${connection.host}:${connection.port}/${connection.name}`,
          );
        });

        connection.on('reconnectFailed', () => {
          logger.error('MongoDB reconnection failed');
          logger.debug(
            `MongoDB failed to reconnect to ${connection.host}:${connection.port}/${connection.name}`,
          );
        });

        connection.set('debug', true);
      }

      return connection;
    },
    retryAttempts: 3,
    retryDelay: 1000,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    heartbeatFrequencyMS: 10000,
  };
};
