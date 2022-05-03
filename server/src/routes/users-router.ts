import { Request, Response, Router } from 'express';

import { userExistsMiddleware } from '../middleware/user-exists-middleware';
import { usersService } from '../services/users-service';
import { param } from 'express-validator';
import { inputValidatorMiddleware } from '../middleware/input-validator-middleware';
import { validateToken } from '../middleware/validate-token-middleware';

export const usersRouter = Router({});

usersRouter
  .get('/', validateToken, async (req: Request, res: Response) => {
    res.send(await usersService.get());
  })
  .get(
    '/:userId',
    validateToken,
    param('userId').custom(userExistsMiddleware.byUserId),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      const id = req.params.userId;
      res.send(await usersService.getById(+id));
    }
  )
  .delete(
    '/:userId',
    validateToken,
    param('userId').custom(userExistsMiddleware.byUserId),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      const id = req.params.userId;
      await usersService.deleteById(+id);
      res.sendStatus(204);
    }
  );
