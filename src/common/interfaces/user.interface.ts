import { IUser } from '@/models/user.model';
import { IBaseDocument } from './base-document.interface';

export type IUserDocument = IUser &
  IBaseDocument & {
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateResetPasswordToken(): Promise<string>;
    validateResetPasswordToken(token: string): boolean;
    generateEmailVerificationToken(): Promise<string>;
    verifyEmail(token: string): Promise<boolean>;
    updateStats(field: string, increment: number): Promise<void>;
    updatePreferences(preferences: Partial<IUser['preferences']>): Promise<void>;
    updateSubscription(subscription: Partial<IUser['subscription']>): Promise<void>;
    linkSocialProfile(provider: string, profileId: string): Promise<void>;
    unlinkSocialProfile(provider: string): Promise<void>;
  };
