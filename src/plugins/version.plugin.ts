import { Schema } from 'mongoose';

export const versionPlugin = (schema: Schema) => {
  schema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    this.set({ $inc: { version: 1 } });
    next();
  });
};
