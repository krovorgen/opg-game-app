import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { usersRouter } from './routes/users-router';
import { runDb } from './repositories/db';
import { settings } from './helpers/settings';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);

app.post('/api/ping', (req: Request, res: Response) => {
  const nowTime = +new Date();
  const frontTime = +new Date(req.body.frontTime);

  res.status(200).json({ ping: nowTime - frontTime });
});

const startApp = async (port: number) => {
  await runDb();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp(settings.PORT as number);
