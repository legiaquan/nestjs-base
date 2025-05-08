import { IUser } from '@/models/user.model';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: IUser;
}
