import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePreferencesDto {
  @ApiProperty({
    description: 'User language preference',
    example: 'en',
    required: false,
  })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty({
    description: 'User theme preference',
    example: 'light',
    required: false,
  })
  @IsString()
  @IsOptional()
  theme?: string;

  @ApiProperty({
    description: 'User currency preference',
    example: 'USD',
    required: false,
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    description: 'Email notification preference',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @ApiProperty({
    description: 'Push notification preference',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  push?: boolean;

  @ApiProperty({
    description: 'SMS notification preference',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  sms?: boolean;

  @ApiProperty({
    description: 'Activity reminders preference',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  activityReminders?: boolean;

  @ApiProperty({
    description: 'Trip updates preference',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  tripUpdates?: boolean;

  @ApiProperty({
    description: 'Marketing messages preference',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  marketingMessages?: boolean;

  @ApiProperty({
    description: 'Community updates preference',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  communityUpdates?: boolean;
}
