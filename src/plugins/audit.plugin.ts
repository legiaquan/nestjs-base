import { Document, Schema } from 'mongoose';

export const auditPlugin = (schema: Schema) => {
  schema.pre('save', function (this: Document, next) {
    if (this.isNew) {
      this.set('createdBy', this.get('updatedBy'));
    }
    next();
  });

  schema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    this.set({ updatedBy: this.getOptions().user?._id });
    next();
  });
};
