import { IBaseDocument } from '@/common/interfaces/base-document.interface';
import { createModel } from '@/models/base.model';

export const USER_MODEL_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';

export interface IUser extends IBaseDocument {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const schemaDefinition = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
};

export const UserModel = createModel<IUser>(USER_MODEL_NAME, schemaDefinition, {
  collection: USER_COLLECTION_NAME,
});
