import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITokenBlacklist, TokenBlacklistModel } from '../../models/token-blacklist.model';
import { EDeviceType } from '../auth/dto/login.dto';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectModel(TokenBlacklistModel.modelName)
    private readonly tokenBlacklistModel: Model<ITokenBlacklist>,
  ) {}

  async addToBlacklist(
    token: string,
    userId: string,
    deviceType: EDeviceType,
    expiresAt: Date,
  ): Promise<void> {
    await this.tokenBlacklistModel.create({ token, userId, deviceType, expiresAt });
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.tokenBlacklistModel.findOne({ token });
    return !!blacklistedToken;
  }

  async getBlacklistedTokensByUser(userId: string): Promise<ITokenBlacklist[]> {
    return this.tokenBlacklistModel.find({ userId });
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.tokenBlacklistModel.deleteMany({
      expiresAt: { $lt: new Date() },
    });
  }
}
