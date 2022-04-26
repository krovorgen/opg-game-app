import { usersRepository } from '../repositories/users-repository';
import { User, UserType } from '../helpers/user';

export const usersService = {
  async get(): Promise<UserType[]> {
    return await usersRepository.get();
  },
  async getById(id: number): Promise<UserType | null> {
    return await usersRepository.getById(id);
  },
  async create(login: string, password: string, nickname: string): Promise<void> {
    let createdUser = await new User(login, password, nickname).getUser();
    await usersRepository.create(createdUser);
  },
  async deleteById(id: number): Promise<void> {
    return await usersRepository.deleteById(id);
  },
};
