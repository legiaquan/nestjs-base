import { hashPassword } from '@/common/utils/password.util';
import { Injectable } from '@nestjs/common';
import {
  ESubscriptionTier,
  EUserRole,
  EUserStatus,
  ICreateUser,
  IResetPassword,
  IUpdateUser,
} from '../../common/types/user.type';
import { IUser } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findByEmail(email);
  }

  async findOne(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: ICreateUser): Promise<IUser> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const userData = {
      ...createUserDto,
      password: hashedPassword,
      name: `${createUserDto.firstName || ''} ${createUserDto.lastName || ''}`.trim(),
      role: EUserRole.USER,
      status: EUserStatus.ACTIVE,
      preferences: {
        language: 'en',
        theme: 'light',
        currency: 'USD',
        notifications: {
          email: true,
          push: true,
          sms: false,
          activityReminders: true,
          tripUpdates: true,
          marketingMessages: false,
          communityUpdates: true,
        },
      },
      subscription: {
        tier: ESubscriptionTier.FREE,
        startDate: new Date(),
        endDate: null,
        autoRenew: false,
      },
      stats: {
        tripsCreated: 0,
        tripsCompleted: 0,
        reviewsWritten: 0,
        reviewsLiked: 0,
        followers: 0,
        following: 0,
      },
      emailVerified: false,
    };
    return this.userRepository.create(userData);
  }

  async update(id: string, updateUserDto: IUpdateUser): Promise<IUser | null> {
    const updateData: Partial<IUser> = { ...updateUserDto };
    if (updateUserDto.firstName || updateUserDto.lastName) {
      updateData.name = `${updateUserDto.firstName || ''} ${updateUserDto.lastName || ''}`.trim();
    }
    return this.userRepository.update(id, updateData);
  }

  async delete(id: string): Promise<IUser | null> {
    return this.userRepository.delete(id);
  }

  async resetPassword(resetPasswordDto: IResetPassword): Promise<IUser | null> {
    const user = await this.userRepository.findByResetToken(resetPasswordDto.token);
    if (!user) {
      return null;
    }

    const hashedPassword = await hashPassword(resetPasswordDto.newPassword);
    return this.userRepository.updatePassword(user._id.toString(), hashedPassword);
  }

  async verifyEmail(token: string): Promise<IUser | null> {
    const user = await this.userRepository.findByVerificationToken(token);
    if (!user) {
      return null;
    }

    return this.userRepository.update(user._id.toString(), {
      emailVerified: true,
      emailVerificationToken: null,
    });
  }

  async updatePreferences(
    id: string,
    preferences: Partial<IUser['preferences']>,
  ): Promise<IUser | null> {
    return this.userRepository.updatePreferences(id, preferences);
  }

  async updateSubscription(
    id: string,
    subscription: Partial<IUser['subscription']>,
  ): Promise<IUser | null> {
    return this.userRepository.updateSubscription(id, subscription);
  }

  async linkSocialProfile(
    id: string,
    provider: keyof NonNullable<IUser['socialProfiles']>,
    profileId: string,
  ): Promise<IUser | null> {
    return this.userRepository.linkSocialProfile(id, provider, profileId);
  }

  async unlinkSocialProfile(
    id: string,
    provider: keyof NonNullable<IUser['socialProfiles']>,
  ): Promise<IUser | null> {
    return this.userRepository.unlinkSocialProfile(id, provider);
  }

  async updateStats(
    id: string,
    field: keyof IUser['stats'],
    increment: number,
  ): Promise<IUser | null> {
    return this.userRepository.updateStats(id, field, increment);
  }

  async updatePassword(id: string, newPassword: string): Promise<IUser | null> {
    const hashedPassword = await hashPassword(newPassword);
    return this.userRepository.updatePassword(id, hashedPassword);
  }
}
