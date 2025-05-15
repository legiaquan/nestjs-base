export default () => ({
  database: {
    uri: `mongodb://${process.env.MONGODB_USERNAME || 'admin'}:${process.env.MONGODB_PASSWORD || 'password'}@${process.env.MONGODB_HOST || 'cluster0.69ewgud.mongodb.net'}/${process.env.MONGODB_DATABASE || 'nestjs-base'}?authSource=${process.env.MONGODB_AUTH_SOURCE || 'admin'}`,
  },
});
