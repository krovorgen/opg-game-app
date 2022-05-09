import { usersRepository } from '../repositories/users-repository';

export const userExistsMiddleware = {
  async byUserId(userId: string) {
    const isFounded = await usersRepository.getById(+userId);
    if (!isFounded) {
      throw 'User not found';
    }
  },
};
