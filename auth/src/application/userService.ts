import { cryptography } from './cryptographyService';

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
  async createUser(email: string, password: string, nickname: string): Promise<UserType> {
    const passwordHash = await cryptography.generateHash(password);

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