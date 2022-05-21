import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { NextFunction } from 'express';
import configuration from '../config/configuration';

export type DecodedJWTType = { userId: number; iat: number; exp: number };

@Injectable()
export class ValidateTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    verify(token, configuration().crypto.JWT_SECRET, (err, decoded) => {
      if (err) throw new HttpException(`Forbidden`, HttpStatus.FORBIDDEN);
      req.tokenData = decoded as DecodedJWTType;
      next();
    });
  }
}
