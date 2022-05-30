export default () => ({
  PORT: process.env.PORT_CHAT || 4300,
  database: {
    MONGO_URL: process.env.MONGO_URL || 'localhost:27017',
  },
});
