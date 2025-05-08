import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LinkSocialProfileDto {
  @ApiProperty({
    description: 'Social profile provider',
    example: 'google',
    enum: ['google', 'facebook', 'twitter'],
  })
  @IsString()
  provider: 'google' | 'facebook' | 'twitter';

  @ApiProperty({
    description: 'Social profile ID',
    example: '123456789',
  })
  @IsString()
  profileId: string;
}
