import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { inputValidatorMiddleware } from '../middleware/input-validator-middleware';
import { usersService } from '../services/users-service';
import { uniqueEmailMiddleware } from '../middleware/unique-email-middleware';
import { uniqueNicknameMiddleware } from '../middleware/unique-nickname-middleware';

export const authRouter = Router({});

authRouter
  .post(
    '/registration',
    body('email').isEmail().notEmpty().custom(uniqueEmailMiddleware),
    body('nickname').notEmpty().custom(uniqueNicknameMiddleware),
    body('password')
      .isLength({ min: 1, max: 28 })
      .withMessage('password can contain from 1 to 28 characters')
      .notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      await usersService.create(req.body.email, req.body.password, req.body.nickname);
      res.sendStatus(201);
    }
  )
  .post(
    '/login',
    body('email').toLowerCase().notEmpty(),
    body('password')
      .isLength({ min: 1, max: 28 })
      .withMessage('password can contain from 1 to 28 characters')
      .notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      const result = await usersService.checkCredentials(req.body.email, req.body.password);
      if (result) {
        res.sendStatus(201);
      } else {
        res.status(400).json({
          errors: [{ message: 'Неверная почта или пароль', field: 'email or password' }],
        });
      }
    }
  )
  .get('/me', (req: Request, res: Response) => {
    res.send(200);
  });
