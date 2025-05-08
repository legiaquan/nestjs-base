import { IBaseDocument } from '@/common/interfaces/base-document.interface';
import { Types } from 'mongoose';
import { EDeviceType } from '../modules/auth/dto/login.dto';
import { createModel } from './base.model';

export const USER_SESSION_MODEL_NAME = 'UserSession';
export const USER_SESSION_COLLECTION_NAME = 'user_sessions';

export interface IUserSession extends IBaseDocument {
  userId: Types.ObjectId;
  deviceType: EDeviceType;
  deviceInfo: {
    userAgent: string;
    ipAddress: string;
    platform?: string;
    browser?: string;
  };
  accessToken: string;
  refreshToken: string;
  isActive: boolean;
  lastActivityAt: Date;
  expiresAt: Date;
}

const schemaDefinition = {
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
    index: true,
  },
  deviceType: {
    type: String,
    required: true,
    enum: ['web', 'mobile'],
  },
  deviceInfo: {
    userAgent: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    platform: String,
    browser: String,
  },
  accessToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastActivityAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
};

export const UserSessionModel = createModel<IUserSession>(
  USER_SESSION_MODEL_NAME,
  schemaDefinition,
  {
    collection: USER_SESSION_COLLECTION_NAME,
  },
);
