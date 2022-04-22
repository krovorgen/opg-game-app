import { client } from './db';

export type UserType = {
  id: number;
  name: string;
  password: string;
  role: 'ADMIN' | 'USER' | 'MODERATOR';
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
  async getById(id: number): Promise<UserType | null> {
    return await users.findOne({ id }, { projection: { _id: 0 } });
  },
  async create(newUser: UserType): Promise<void> {
    await users.insertOne(newUser);
  },
  async deleteById(id: number): Promise<void> {
    await users.deleteOne({ id });
  },
};
