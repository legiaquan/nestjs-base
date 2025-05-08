import { IBaseDocument } from '../common/interfaces/base-document.interface';
import { ESubscriptionTier, EUserRole, EUserStatus } from '../common/types';
import { createModel } from './base.model';

export const USER_MODEL_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';

export interface IUser extends IBaseDocument {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  name: string;
  role: EUserRole;
  status: EUserStatus;
  emailVerified: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  socialProfiles?: {
    google?: string;
    facebook?: string;
    twitter?: string;
  };
  stats: {
    tripsCreated: number;
    tripsCompleted: number;
    reviewsWritten: number;
    reviewsLiked: number;
    followers: number;
    following: number;
  };
  preferences: {
    language: string;
    theme: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
      activityReminders: boolean;
      tripUpdates: boolean;
      marketingMessages: boolean;
      communityUpdates: boolean;
    };
  };
  subscription: {
    tier: ESubscriptionTier;
    startDate: Date;
    endDate: Date | null;
    autoRenew: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const schemaDefinition = {
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.ACTIVE,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  socialProfiles: {
    google: String,
    facebook: String,
    twitter: String,
  },
  stats: {
    tripsCreated: { type: Number, default: 0 },
    tripsCompleted: { type: Number, default: 0 },
    reviewsWritten: { type: Number, default: 0 },
    reviewsLiked: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
  },
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
    currency: { type: String, default: 'USD' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      activityReminders: { type: Boolean, default: true },
      tripUpdates: { type: Boolean, default: true },
      marketingMessages: { type: Boolean, default: true },
      communityUpdates: { type: Boolean, default: true },
    },
  },
  subscription: {
    tier: {
      type: String,
      enum: Object.values(ESubscriptionTier),
      default: ESubscriptionTier.FREE,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    autoRenew: { type: Boolean, default: false },
  },
};

export const UserModel = createModel<IUser>(USER_MODEL_NAME, schemaDefinition, {
  collection: USER_COLLECTION_NAME,
  validateBeforeSave: true,
  strict: true,
});
