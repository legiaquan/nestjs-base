import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Reset password token',
    example: 'abc123',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'New password',
    example: 'newpassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
