import { IBaseDocument } from '@/common/interfaces/base-document.interface';
import { Schema, SchemaOptions, model as mongooseModel } from 'mongoose';
import { auditPlugin } from '../plugins/audit.plugin';
import { paginationPlugin } from '../plugins/pagination.plugin';
import { versionPlugin } from '../plugins/version.plugin';

export const createModel = <T extends IBaseDocument>(
  documentName: string,
  definition: Record<string, any>,
  options?: SchemaOptions,
) => {
  const schema = new Schema<T>(definition, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      // @ts-expect-error - Mongoose type issue
      transform: (_: any, ret: Record<string, any>) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      // @ts-expect-error - Mongoose type issue
      transform: (_: any, ret: Record<string, any>) => {
        delete ret.__v;
        return ret;
      },
    },
    ...options,
  });

  // Apply common plugins
  // schema.plugin(baseSchemaPlugin);
  schema.plugin(versionPlugin);
  schema.plugin(auditPlugin);
  schema.plugin(paginationPlugin);

  const model = mongooseModel<T>(documentName, schema);
  model.modelName = documentName;
  return model;
};
