import { UserSessionModel } from '@/models/user-session.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSessionRepository } from '../../repositories/user-session.repository';
import { UserSessionService } from './user-session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSessionModel.modelName, schema: UserSessionModel.schema },
    ]),
  ],
  providers: [UserSessionService, UserSessionRepository],
  exports: [UserSessionService],
})
export class UserSessionModule {}
