import { IBaseDocument } from '@/common/interfaces/base-document.interface';
import { Types } from 'mongoose';
import { createModel } from './base.model';

export const TOKEN_BLACKLIST_MODEL_NAME = 'TokenBlacklist';
export const TOKEN_BLACKLIST_COLLECTION_NAME = 'token_blacklist';

export interface ITokenBlacklist extends IBaseDocument {
  token: string;
  userId: Types.ObjectId;
  deviceType: string;
  expiresAt: Date;
}

const schemaDefinition = {
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    index: true,
  },
  deviceType: {
    type: String,
    required: true,
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
};

export const TokenBlacklistModel = createModel<ITokenBlacklist>(
  TOKEN_BLACKLIST_MODEL_NAME,
  schemaDefinition,
  {
    collection: TOKEN_BLACKLIST_COLLECTION_NAME,
  },
);
