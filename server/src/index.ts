import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { usersRouter } from './routes/users-router';
import { runDb } from './repositories/db';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/api/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  res.send(200);
});

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
