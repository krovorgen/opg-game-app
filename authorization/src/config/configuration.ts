export default () => ({
  PORT: parseInt(process.env.PORT_AUTH, 10) || 4100,
  database: {
    MONGO_URL: process.env.MONGO_URL || 'localhost:27017',
  },
  crypto: {
    JWT_SECRET: process.env.JWT_SECRET || '123',
  },
  EMAIL_URL: process.env.EMAIL_URL || 'http://email:4200/api/',
});
