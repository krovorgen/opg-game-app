import { usersRepository } from '../repositories/users-repository';

export const uniqueEmailMiddleware = async (email: string) => {
  const isFounded = await usersRepository.getByEmail(email);
  if (isFounded) {
    throw 'This email is already registered in the system';
  }
};
