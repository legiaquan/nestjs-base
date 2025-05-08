import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateStatsDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Field to update',
    example: 'tripsCreated',
    enum: [
      'tripsCreated',
      'tripsCompleted',
      'reviewsWritten',
      'reviewsLiked',
      'followers',
      'following',
    ],
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: 'Value to increment by',
    example: 1,
  })
  @IsNumber()
  increment: number;
}
