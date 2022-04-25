import { usersRepository } from '../repositories/users-repository';

export const uniqueLoginMiddleware = async (login: string) => {
  const isFounded = await usersRepository.getByLogin(login);
  if (isFounded) {
    throw 'This login is already registered in the system';
  }
};
