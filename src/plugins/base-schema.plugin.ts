// interface IBaseModel<T extends Document> extends Model<T> {
//   findActive(): Promise<T[]>;
//   findInactive(): Promise<T[]>;
//   findByDateRange(startDate: Date, endDate: Date): Promise<T[]>;
// }

export const baseSchemaPlugin = () => {
  // Add static methods
  // schema.static('findActive', function (this: IBaseModel<Document>): Promise<Document[]> {
  //   return this.find({ status: 'active' });
  // });
  // schema.static('findInactive', function (this: IBaseModel<Document>): Promise<IBaseDocument[]> {
  //   return this.find({ status: 'inactive' });
  // });
  // schema.static(
  //   'findByDateRange',
  //   function (
  //     this: IBaseModel<Document>,
  //     startDate: Date,
  //     endDate: Date,
  //   ): Promise<IBaseDocument[]> {
  //     return this.find({
  //       createdAt: {
  //         $gte: startDate,
  //         $lte: endDate,
  //       },
  //     });
  //   },
  // );
};
