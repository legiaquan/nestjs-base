import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { IBaseDocument } from '../common/interfaces/base-document.interface';

export abstract class BaseRepository<T extends IBaseDocument> {
  constructor(protected readonly model: Model<T>) {}

  async findById(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findById(id).exec();
  }
  async findOne(
    filter: FilterQuery<T>,
    options?: { lean?: boolean; populate?: string | string[] },
  ): Promise<T | null> {
    const query = this.model.findOne(filter);
    if (options?.lean === false) {
      query.lean(false);
    }
    if (options?.populate) {
      query.populate(options.populate);
    }
    return query.exec();
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    console.log('data: ', data);
    return entity.save();
  }

  async update(id: string | Types.ObjectId, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const count = await this.model.countDocuments(filter).exec();
    return count > 0;
  }
}
