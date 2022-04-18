import { NextFunction, Request, Response } from 'express';
import { usersRepository } from '../repositories/users-repository';

export const userExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let userId: string;
  if (req.params.userId) {
    userId = req.params.userId;
  } else {
    userId = req.body.userId;
  }

  const isFounded = await usersRepository.getById(+userId);
  if (!isFounded) {
    res.sendStatus(404);
  } else {
    next();
  }
};
