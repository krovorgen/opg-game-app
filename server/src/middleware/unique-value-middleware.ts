import { usersRepository } from '../repositories/users-repository';

export const uniqueValueMiddleware = {
  async nickname(nickname: string) {
    const isFounded = await usersRepository.getByNickname(nickname);
    if (isFounded) {
      throw 'This nickname is already registered in the system';
    }
  },
  async email(email: string) {
    const isFounded = await usersRepository.getByEmail(email);
    if (isFounded) {
      throw 'This email is already registered in the system';
    }
  },
};
