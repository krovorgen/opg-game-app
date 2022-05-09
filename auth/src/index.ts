import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { runDb } from './repositories/db';
import { authRouter } from './routes/auth-router';
import { settings } from './helpers/settings';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

const startApp = async (port: number) => {
  await runDb();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp(settings.PORT as number);
