import { TokenBlacklistModel } from '@models/token-blacklist.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenBlacklistRepository } from '@repositories/token-blacklist.repository';
import { TokenBlacklistService } from './token-blacklist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenBlacklistModel.modelName, schema: TokenBlacklistModel.schema },
    ]),
  ],
  providers: [TokenBlacklistService, TokenBlacklistRepository] as const,
  exports: [TokenBlacklistService],
})
export class TokenBlacklistModule {}
