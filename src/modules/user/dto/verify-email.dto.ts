import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Email verification token',
    example: 'abc123',
  })
  @IsString()
  token: string;
}
