import { usersRepository, UserType } from '../repositories/users-repository';

export const usersService = {
  async get(): Promise<UserType[]> {
    return await usersRepository.get();
  },
  async getById(id: number): Promise<UserType | null> {
    return await usersRepository.getById(id);
  },
  async deleteById(id: number): Promise<void> {
    return await usersRepository.deleteById(id);
  },
};
