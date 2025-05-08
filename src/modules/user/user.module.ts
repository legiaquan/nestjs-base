import { UserModel } from '@/models/user.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '../../repositories/user.repository';
import { TokenBlacklistModule } from '../token-blacklist/token-blacklist.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.modelName, schema: UserModel.schema }]),
    TokenBlacklistModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
