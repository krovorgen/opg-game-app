import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { inputValidatorMiddleware } from '../middleware/input-validator-middleware';
import { authService } from '../services/auth-service';
import { jwtService } from '../application/jwtService';
import { userExistsMiddleware } from '../middleware/user-exists-middleware';
import { validateToken } from '../middleware/validate-token-middleware';
import { authRepository } from '../repositories/auth-repository';
import { uniqueValueMiddleware } from '../middleware/unique-value-middleware';

export const authRouter = Router({});

authRouter
  .post(
    '/registration',
    body('email').isEmail().notEmpty().custom(uniqueValueMiddleware.email),
    body('nickname').notEmpty().custom(uniqueValueMiddleware.nickname),
    body('password')
      .isLength({ min: 1, max: 28 })
      .withMessage('password can contain from 1 to 28 characters')
      .notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      await authService.create(req.body.email, req.body.password, req.body.nickname);
      res.sendStatus(201);
    }
  )
  .post(
    '/login',
    body('email').toLowerCase().notEmpty().custom(userExistsMiddleware.byEmail),
    body('password')
      .isLength({ min: 1, max: 28 })
      .withMessage('password can contain from 1 to 28 characters')
      .notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      const result = await authService.checkCredentials(req.body.email, req.body.password);
      if (result) {
        const token = jwtService.createJWT(result);
        res.status(201).json({
          token: `Bearer ${token}`,
        });
      } else {
        res.status(400).json({
          errors: [{ message: 'Неверная почта или пароль', field: 'email or password' }],
        });
      }
    }
  )
  .post('/me', validateToken, async (req: Request, res: Response) => {
    const userId = req.tokenData.userId;
    const user = await authRepository.getById(userId);
    res.status(201).send(user);
  });
