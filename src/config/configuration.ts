export default () => ({
  database: {
    username: process.env.MONGODB_USERNAME || 'admin',
    password: process.env.MONGODB_PASSWORD || 'password',
    host: process.env.MONGODB_HOST || 'localhost',
    port: parseInt(process.env.MONGODB_PORT || '27017', 10),
    database_name: process.env.MONGODB_DATABASE || 'nestjs-base',
    authSource: process.env.MONGODB_AUTH_SOURCE,
  },
});
