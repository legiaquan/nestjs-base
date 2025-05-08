import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserSession, USER_SESSION_MODEL_NAME } from '../models/user-session.model';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserSessionRepository extends BaseRepository<IUserSession> {
  constructor(@InjectModel(USER_SESSION_MODEL_NAME) model: Model<IUserSession>) {
    super(model);
  }

  async create(data: Partial<IUserSession>): Promise<IUserSession> {
    console.log('data: ', data);
    const entity = new this.model(data);
    return entity.save();
  }

  async findByAccessToken(accessToken: string): Promise<IUserSession | null> {
    return this.findOne({ accessToken }, { populate: 'userId' });
  }

  async findByRefreshToken(refreshToken: string): Promise<IUserSession | null> {
    return this.findOne({ refreshToken }, { populate: 'userId' });
  }

  async findActiveSessions(userId: string): Promise<IUserSession[]> {
    return this.find({
      userId,
      isActive: true,
      expiresAt: { $gt: new Date() },
    });
  }

  async deactivateSession(accessToken: string): Promise<IUserSession | null> {
    return this.model
      .findOneAndUpdate(
        { accessToken },
        { isActive: false, lastActivityAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async deactivateAllSessions(userId: string): Promise<void> {
    await this.model.updateMany({ userId, isActive: true }, { isActive: false }).exec();
  }

  async updateLastActivity(accessToken: string): Promise<IUserSession | null> {
    return this.model
      .findOneAndUpdate({ accessToken }, { lastActivityAt: new Date() }, { new: true })
      .exec();
  }

  async cleanupExpiredSessions(): Promise<void> {
    await this.model.deleteMany({ expiresAt: { $lt: new Date() } }).exec();
  }
}
