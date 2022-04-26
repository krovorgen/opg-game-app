import { usersRepository } from '../repositories/users-repository';

export const uniqueNicknameMiddleware = async (nickname: string) => {
  const isFounded = await usersRepository.getByNickname(nickname);
  if (isFounded) {
    throw 'This nickname is already registered in the system';
  }
};
