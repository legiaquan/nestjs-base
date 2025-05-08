import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { EUserRole } from '../../../common/types/user.type';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'User role',
    example: EUserRole.USER,
    enum: EUserRole,
    required: false,
  })
  @IsEnum(EUserRole)
  @IsOptional()
  role?: EUserRole;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;
}
