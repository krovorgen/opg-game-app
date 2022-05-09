import { authRepository } from '../repositories/auth-repository';
import { User, UserType } from '../application/userService';
import { cryptography } from '../application/cryptographyService';

export const authService = {
  async getByEmail(email: string): Promise<UserType | null> {
    return await authRepository.getByEmail(email);
  },
  async getByNickname(nickname: string): Promise<UserType | null> {
    return await authRepository.getByNickname(nickname);
  },
  async create(email: string, password: string, nickname: string): Promise<void> {
    let createdUser = await new User().createUser(email, password, nickname);
    await authRepository.create(createdUser);
  },
  async checkCredentials(email: string, password: string): Promise<UserType | null> {
    const user = (await authRepository.getByEmail(email)) as UserType;
    const correctPassword = await cryptography.correctPassword(password, user.passwordHash);
    return correctPassword ? user : null;
  },
};
