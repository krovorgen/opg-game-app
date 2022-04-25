import { usersRepository } from '../repositories/users-repository';
import { User, UserType } from '../helpers/user';

export const usersService = {
  async get(): Promise<UserType[]> {
    return await usersRepository.get();
  },
  async getById(id: number): Promise<UserType | null> {
    return await usersRepository.getById(id);
  },
  async create(name: string, password: string): Promise<void> {
    let classNewUser = new User(name, password);
    await classNewUser.init();

    await usersRepository.create(classNewUser);
  },
  async deleteById(id: number): Promise<void> {
    return await usersRepository.deleteById(id);
  },
};
