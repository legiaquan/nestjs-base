import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    description: 'Database connection status',
    example: 'connected',
  })
  database: string;
}

export class PingResponseDto {}
