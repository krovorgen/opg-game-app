import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { inputValidatorMiddleware } from '../middleware/input-validator-middleware';
import { usersService } from '../services/users-service';
import { uniqueLoginMiddleware } from '../middleware/unique-login-middleware';
import { uniqueNicknameMiddleware } from '../middleware/unique-nickname-middleware';

export const authRouter = Router({});

authRouter
  .post(
    '/registration',
    body('login').toLowerCase().notEmpty().custom(uniqueLoginMiddleware),
    body('nickname').notEmpty().custom(uniqueNicknameMiddleware),
    body('password')
      .isLength({ min: 1, max: 28 })
      .withMessage('password can contain from 1 to 28 characters')
      .notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      await usersService.create(req.body.login, req.body.password, req.body.nickname);
      res.sendStatus(201);
    }
  )
  .post(
    '/login',
    body('login').toLowerCase().notEmpty(),
    body('password').notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      res.sendStatus(200);
    }
  )
  .get('/me', (req: Request, res: Response) => {
    res.send(200);
  });
