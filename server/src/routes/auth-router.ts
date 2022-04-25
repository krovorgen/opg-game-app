import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { inputValidatorMiddleware } from '../middleware/input-validator-middleware';
import { usersService } from '../services/users-service';
import { uniqueLoginMiddleware } from '../middleware/unique-login-middleware';

export const authRouter = Router({});

authRouter
  .post(
    '/registration',
    body('login').notEmpty().custom(uniqueLoginMiddleware),
    body('password').notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      await usersService.create(req.body.login, req.body.password);
      res.sendStatus(201);
    }
  )
  .get('/me', (req: Request, res: Response) => {
    res.send(200);
  });
