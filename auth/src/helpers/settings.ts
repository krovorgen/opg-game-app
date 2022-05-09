export const settings = {
  MONGO_URL: !process.env.MONGO_URL || 'localhost:27017',
  PORT: process.env.PORT || 4100,
  JWT_SECRET: process.env.JWT_SECRET || '123',
};
