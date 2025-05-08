import { IBaseDocument } from '@/common/interfaces/base-document.interface';
import { Schema } from 'mongoose';
import slugify from 'slugify';

interface ISlugDocument extends IBaseDocument {
  slug?: string;
  [key: string]: any;
}

export const slugPlugin = (schema: Schema, options: { field: string }) => {
  schema.pre('save', function (this: ISlugDocument, next) {
    if (this.isModified(options.field)) {
      this.set('slug', slugify(this[options.field], { lower: true, strict: true }));
    }
    next();
  });

  schema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    const update = this.getUpdate() as Record<string, any>;
    if (update[options.field]) {
      this.set({ slug: slugify(update[options.field], { lower: true, strict: true }) });
    }
    next();
  });
};
