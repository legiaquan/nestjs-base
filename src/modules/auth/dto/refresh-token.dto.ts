import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 'rt_1a2b3c4d5e6f7g8h9i0j' })
  @IsString()
  refreshToken: string;
}
