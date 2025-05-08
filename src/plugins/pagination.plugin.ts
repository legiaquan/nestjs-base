import { Query, Schema } from 'mongoose';

interface IPaginationOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}

interface IPaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IPaginationQuery<T> extends Query<T, any> {
  paginate(options?: IPaginationOptions): Promise<IPaginationResult<T>>;
}

export const paginationPlugin = (schema: Schema) => {
  (schema.query as IPaginationQuery<any>).paginate = async function <T>(
    options: IPaginationOptions = {},
  ): Promise<IPaginationResult<T>> {
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 10);
    const sort = options.sort || { createdAt: -1 };

    const [data, total] = await Promise.all([
      this.clone()
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec() as Promise<T[]>,
      this.model.countDocuments(this.getQuery()) as Promise<number>,
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  };
};
