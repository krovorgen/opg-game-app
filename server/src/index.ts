import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/users-router';
import { runDb } from './repositories/db';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/api/users', usersRouter);

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
startApp();
