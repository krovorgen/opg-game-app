export default () => ({
  PORT: parseInt(process.env.PORT_SERVER, 10) || 4000,
  database: {
    MONGO_URL: process.env.MONGO_URL || 'localhost:27017',
  },
  crypto: {
    JWT_SECRET: process.env.JWT_SECRET || '123',
  },
});
