import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'User ID',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'CurrentPassword123!',
    description: 'Current password of the user',
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description:
      'New password. Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  newPassword: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description: 'Confirm new password. Must match the new password field',
  })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  confirmPassword: string;
}
