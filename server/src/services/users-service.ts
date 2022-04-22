import { usersRepository } from '../repositories/users-repository';

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

export const usersService = {
  async get(): Promise<UserType[]> {
    return await usersRepository.get();
  },
  async getById(id: number): Promise<UserType | null> {
    return await usersRepository.getById(id);
  },
  async create(name: string, password: string): Promise<void> {
    const newUser: UserType = {
      id: +new Date(),
      name,
      password,
      role: 'USER',
      lvlPoint: 0,
      money: 0,
      popularPoint: 0,
      updated: new Date(),
      created: new Date(),
    };
    await usersRepository.create(newUser);
  },
  async deleteById(id: number): Promise<void> {
    return await usersRepository.deleteById(id);
  },
};
