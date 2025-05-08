import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'User password. Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
  })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Confirm password. Must match the password field',
  })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  confirmPassword: string;

  @ApiProperty({
    example: true,
    description: 'User must accept terms and conditions',
  })
  @IsBoolean()
  terms: boolean;
}
