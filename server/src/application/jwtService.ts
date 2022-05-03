import { UserType } from '../helpers/user';
import jwt from 'jsonwebtoken';
import { settings } from '../helpers/settings';

const JWTSecret = settings.JWT_SECRET;

export const jwtService = {
  createJWT(user: UserType) {
    return jwt.sign({ userId: user.id }, JWTSecret, { expiresIn: '365d' });
  },
};
