export const API_PREFIX_PATH = '/api/v1';

export const SWAGGER_TITLE = 'NestJs Base API';
export const SWAGGER_DESCRIPTION = 'NestJs Base API Documentation';
export const SWAGGER_VERSION = '1.0';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/';
