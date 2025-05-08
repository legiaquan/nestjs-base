export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
}

export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

export enum ESubscriptionTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive?: boolean;
  refreshToken?: string | null;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IResetPassword {
  token: string;
  newPassword: string;
}
