import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

export type UserRoleType = 'ADMIN' | 'USER' | 'MODERATOR';

export type UserType = {
  id: number;
  email: string;
  nickname: string;
  passwordHash: string;
  role: UserRoleType;
  lvlPoint: number;
  money: number;
  popularPoint: number;
  updated: Date;
  created: Date;
};

export class User {
  generateHash = async (password: string): Promise<string> => {
    const salt = randomBytes(8).toString('hex');
    const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;
    return `${salt}:${buf.toString('hex')}`;
  };

  correctPassword = async (password: string, hash: string): Promise<boolean> => {
    const [salt, hashedPassword] = hash.split(':');
    const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;
    return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buf);
  };

  async createUser(email: string, password: string, nickname: string): Promise<UserType> {
    const passwordHash = await this.generateHash(password);

    return {
      id: +new Date(),
      email,
      nickname,
      passwordHash,
      role: 'USER',
      lvlPoint: 0,
      money: 0,
      popularPoint: 0,
      updated: new Date(),
      created: new Date(),
    };
  }
}
