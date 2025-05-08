import { config } from 'dotenv';
import 'reflect-metadata';

// Load environment variables
config();

// Set default timeout for all tests
jest.setTimeout(30000);

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.MONGODB_URI =
  'mongodb://admin:password@localhost:27017/nestjs-base-unit-test?authSource=admin';
