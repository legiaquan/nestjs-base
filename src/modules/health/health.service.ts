import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

import { HealthResponseDto, PingResponseDto } from './dto/health.response.dto';

@Injectable()
export class HealthService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async checkHealth(): Promise<HealthResponseDto> {
    try {
      const dbState = this.connection.readyState;
      await Promise.resolve();
      return {
        database: dbState === ConnectionStates.connected ? 'connected' : 'disconnected',
      };
    } catch (error: unknown) {
      throw error instanceof Error ? error : new Error('Unknown error');
    }
  }

  ping(): PingResponseDto {
    return {};
  }
}
