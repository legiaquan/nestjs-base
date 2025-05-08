import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, UserModel } from '../models/user.model';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<IUser> {
  constructor(@InjectModel(UserModel.modelName) model: Model<IUser>) {
    super(model);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email }, { lean: false });
  }

  async findByResetToken(token: string): Promise<IUser | null> {
    return this.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });
  }

  async findByVerificationToken(token: string): Promise<IUser | null> {
    return this.findOne({ emailVerificationToken: token });
  }

  async updatePassword(id: string, password: string): Promise<IUser | null> {
    return this.update(id, { password });
  }

  async updatePreferences(
    id: string,
    preferences: Partial<IUser['preferences']>,
  ): Promise<IUser | null> {
    return this.update(id, { preferences });
  }

  async updateSubscription(
    id: string,
    subscription: Partial<IUser['subscription']>,
  ): Promise<IUser | null> {
    return this.update(id, { subscription });
  }

  async updateStats(
    id: string,
    field: keyof IUser['stats'],
    increment: number,
  ): Promise<IUser | null> {
    return this.model
      .findByIdAndUpdate(id, { $inc: { [`stats.${field}`]: increment } }, { new: true })
      .exec();
  }

  async linkSocialProfile(
    id: string,
    provider: keyof NonNullable<IUser['socialProfiles']>,
    profileId: string,
  ): Promise<IUser | null> {
    return this.model
      .findByIdAndUpdate(id, { $set: { [`socialProfiles.${provider}`]: profileId } }, { new: true })
      .exec();
  }

  async unlinkSocialProfile(
    id: string,
    provider: keyof NonNullable<IUser['socialProfiles']>,
  ): Promise<IUser | null> {
    return this.model
      .findByIdAndUpdate(id, { $unset: { [`socialProfiles.${provider}`]: 1 } }, { new: true })
      .exec();
  }
}
