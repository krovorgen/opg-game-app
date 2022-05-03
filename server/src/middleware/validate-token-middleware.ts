import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { settings } from '../helpers/settings';

export type DecodedJWTType = { userId: number; iat: number; exp: number };

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, settings.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.tokenData = decoded as DecodedJWTType;
    next();
  });
};
