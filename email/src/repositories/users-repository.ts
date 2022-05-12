import { client } from './db';

export type UserRoleType = 'ADMIN' | 'USER' | 'MODERATOR';

export type UserType = {
  id: number;
  email: string;
  emailConfig: {
    recoveryCode: string;
  };
  nickname: string;
  passwordHash: string;
  role: UserRoleType;
  lvlPoint: number;
  money: number;
  popularPoint: number;
  updated: Date;
  created: Date;
};

export let users = client.db('test').collection<UserType>('users');

export const usersRepository = {
  async get(): Promise<UserType[]> {
    return await users.find({}, { projection: { _id: 0 } }).toArray();
  },
  async getByEmail(email: string): Promise<UserType | null> {
    return await users.findOne({ email }, { projection: { _id: 0, passwordHash: 0 } });
  },
};