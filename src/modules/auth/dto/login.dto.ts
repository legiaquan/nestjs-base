import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum EDeviceType {
  WEB = 'web',
  MOBILE = 'mobile',
}

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: EDeviceType,
    default: EDeviceType.WEB,
    example: EDeviceType.WEB,
    description: 'Type of device used for login',
  })
  @IsEnum(EDeviceType)
  @IsNotEmpty()
  deviceType: EDeviceType = EDeviceType.WEB;
}
