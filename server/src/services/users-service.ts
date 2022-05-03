import bcrypt from 'bcryptjs';

import { usersRepository } from '../repositories/users-repository';
import { User, UserType } from '../helpers/user';

export const usersService = {
  async get(): Promise<UserType[]> {
    return await usersRepository.get();
  },
  async getById(id: number): Promise<UserType | null> {
    return await usersRepository.getById(id);
  },
  async create(email: string, password: string, nickname: string): Promise<void> {
    let createdUser = await new User().createUser(email, password, nickname);
    await usersRepository.create(createdUser);
  },
  async checkCredentials(email: string, password: string): Promise<UserType | null> {
    const user = (await usersRepository.getByEmail(email)) as UserType;
    const correctPassword = await bcrypt.compare(password, user.passwordHash);
    return correctPassword ? user : null;
  },
  async deleteById(id: number): Promise<void> {
    return await usersRepository.deleteById(id);
  },
};
