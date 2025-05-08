import { ITokenBlacklist, TokenBlacklistModel } from '@models/token-blacklist.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@repositories/base.repository';
import { Model, Types } from 'mongoose';

@Injectable()
export class TokenBlacklistRepository extends BaseRepository<ITokenBlacklist> {
  constructor(@InjectModel(TokenBlacklistModel.modelName) model: Model<ITokenBlacklist>) {
    super(model);
  }

  async addToBlacklist(
    token: string,
    userId: Types.ObjectId,
    deviceType: string,
    expiresAt: Date,
  ): Promise<ITokenBlacklist> {
    return await this.create({
      token,
      userId,
      deviceType,
      expiresAt,
    });
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.findOne({
      token,
      expiresAt: { $gt: new Date() },
    });
    return blacklistedToken !== null;
  }

  async removeExpiredTokens(): Promise<void> {
    await this.model.deleteMany({ expiresAt: { $lt: new Date() } }).exec();
  }
}
