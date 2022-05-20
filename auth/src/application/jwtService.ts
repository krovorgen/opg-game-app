import { UserType } from './userService';
import jwt from 'jsonwebtoken';
import { settings } from '../helpers/settings';

class JwtService {
  createJWT(user: UserType) {
    return jwt.sign({ userId: user.id }, settings.JWT_SECRET, { expiresIn: '365d' });
  }
}

export const jwtService = new JwtService();
