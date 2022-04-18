import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

import { usersRepository } from '../repositories/users-repository';
import { userExistsMiddleware } from '../middleware/user-exists-middleware';
import { inputValidatorMiddleware } from '../middleware/input-validator-middleware';

export const usersRouter = Router({});

usersRouter
  .get('/', async (req: Request, res: Response) => {
    res.send(await usersRepository.get());
  })
  .get('/:userId', userExistsMiddleware, async (req: Request, res: Response) => {
    const id = req.params.userId;
    res.send(await usersRepository.getById(+id));
  })
  .post(
    '/',
    body('name').notEmpty(),
    body('password').notEmpty(),
    inputValidatorMiddleware,
    async (req: Request, res: Response) => {
      const name = req.body.name;
      const password = req.body.password;
      await usersRepository.create(name, password);
      res.sendStatus(201);
    }
  )
  .delete('/:userId', userExistsMiddleware, async (req: Request, res: Response) => {
    const id = req.params.userId;
    await usersRepository.deleteById(+id);
    res.sendStatus(204);
  });
