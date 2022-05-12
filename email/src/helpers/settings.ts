export const settings = {
  MONGO_URL: process.env.MONGO_URL || 'localhost:27017',
  PORT: process.env.PORT || 4200,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL || 'test@mail.ru',
  NODEMAILER_PASS: process.env.NODEMAILER_PASS || '123',
  FRONT_URL: process.env.FRONT_URL || 'http://localhost:3000/set-new-password/',
};
