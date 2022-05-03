import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { usersRouter } from './routes/users-router';
import { runDb } from './repositories/db';
import { authRouter } from './routes/auth-router';
import { settings } from './helpers/settings';

const app = express();
app.use(cors());
app.use(express.json());

const port = settings.PORT;

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// app.use(express.static(path.join(__dirname, '../../client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

app.post('/api/ping', (req: Request, res: Response) => {
  const nowTime = +new Date();
  const frontTime = +new Date(req.body.frontTime);

  res.status(200).json({ ping: nowTime - frontTime });
});

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
startApp();
