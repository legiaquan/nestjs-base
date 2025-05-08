import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IUserSession } from '../../models/user-session.model';
import { UserSessionRepository } from '../../repositories/user-session.repository';
import { EDeviceType } from '../auth/dto/login.dto';

@Injectable()
export class UserSessionService {
  constructor(private readonly userSessionRepository: UserSessionRepository) {}

  async createSession({
    userId,
    deviceType,
    deviceInfo,
    accessToken,
    refreshToken,
    expiresAt,
  }: {
    userId: Types.ObjectId;
    deviceType: EDeviceType;
    deviceInfo: IUserSession['deviceInfo'];
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
  }): Promise<IUserSession> {
    return this.userSessionRepository.create({
      userId,
      deviceType,
      deviceInfo,
      accessToken,
      refreshToken,
      expiresAt,
      isActive: true,
      lastActivityAt: new Date(),
    });
  }

  async deactivateSession(accessToken: string): Promise<void> {
    await this.userSessionRepository.deactivateSession(accessToken);
  }

  async deactivateAllSessions(userId: string): Promise<void> {
    await this.userSessionRepository.deactivateAllSessions(userId);
  }

  async getActiveSessions(userId: string): Promise<IUserSession[]> {
    return this.userSessionRepository.findActiveSessions(userId);
  }

  async updateLastActivity(accessToken: string): Promise<void> {
    await this.userSessionRepository.updateLastActivity(accessToken);
  }

  async cleanupExpiredSessions(): Promise<void> {
    await this.userSessionRepository.cleanupExpiredSessions();
  }
}
