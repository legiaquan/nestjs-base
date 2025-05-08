import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ESubscriptionTier } from '../../../common/types/user.type';

export class UpdateSubscriptionDto {
  @ApiProperty({
    description: 'Subscription tier',
    example: ESubscriptionTier.PREMIUM,
    enum: ESubscriptionTier,
    required: false,
  })
  @IsEnum(ESubscriptionTier)
  @IsOptional()
  tier?: ESubscriptionTier;

  @ApiProperty({
    description: 'Subscription start date',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'Subscription end date',
    example: '2024-12-31T23:59:59.999Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    description: 'Auto renew subscription',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  autoRenew?: boolean;

  @ApiProperty({
    description: 'Payment method ID',
    example: 'pm_123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  paymentMethod?: string;
}
