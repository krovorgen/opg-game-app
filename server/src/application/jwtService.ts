import { UserType } from '../helpers/user';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const jwtService = {
  async createJWT(user: UserType) {
    return jwt.sign({ userId: user.id }, '123', { expiresIn: '365d' });
  },
  async getUserIdByToken(token: string) {
    try {
      const result: any = jwt.verify(token, '123');
      return new ObjectId(result.userId);
    } catch (e) {
      return null;
    }
  },
};
