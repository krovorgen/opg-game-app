export const settings = {
  MONGO_URL: process.env.MONGO_URL || 'localhost:27017',
  PORT: process.env.PORT_EMAIL || 4200,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL || 'test@mail.ru',
  NODEMAILER_PASS: process.env.NODEMAILER_PASS || '123',
  FRONT_URL: process.env.FRONT_URL_SET_NEW_PASS || 'http://localhost:80/set-new-password/',
};
