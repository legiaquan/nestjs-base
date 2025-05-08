import { Document, Types } from 'mongoose';

export interface IBaseDocument extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  deletedAt: Date;
  deletedBy: Types.ObjectId;
  metadata: Record<string, any>;
  version: number;
}
