export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  subscription: {
    plan: string;
    expiresAt: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
}

export interface AuthResponse extends TokenResponse {
  user: UserResponse;
}

export interface SignUpDto {
  user: UserResponse;
}

export enum ESecurityRole {
  ADMIN = 'admin',
  USER = 'user',
}
