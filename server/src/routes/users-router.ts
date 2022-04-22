import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';

import { userExistsMiddleware } from '../middleware/user-exists-middleware';
import { inputValidatorMiddleware } from '../middleware/input-validator-middleware';
import { usersService } from '../services/users-service';

export const usersRouter = Router({});

usersRouter
  .get('/', async (req: Request, res: Response) => {
    res.send(await usersService.get());
  })
  .get('/:userId', userExistsMiddleware, async (req: Request, res: Response) => {
    const id = req.params.userId;
    res.send(await usersService.getById(+id));
  })
  .post(
    '/',
    body('name').notEmpty(),
    body('password').notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      const name = req.body.name;
      const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(2));
      const checkPassword = bcrypt.compareSync('1', passwordHash);

      await usersService.create(name, passwordHash);
      res.sendStatus(201);
    }
  )
  .delete('/:userId', userExistsMiddleware, async (req: Request, res: Response) => {
    const id = req.params.userId;
    await usersService.deleteById(+id);
    res.sendStatus(204);
  });
