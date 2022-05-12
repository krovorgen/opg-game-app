import { authRepository } from '../repositories/auth-repository';

export const userExistsMiddleware = {
  async byEmail(email: string) {
    const isFounded = await authRepository.getByEmail(email);
    if (!isFounded) {
      throw 'User not found';
    }
  },
  async byRecoveryCode(recoveryCode: string) {
    const isFounded = await authRepository.getByRecoveryCode(recoveryCode);
    if (!isFounded) {
      throw 'Ссылка на восстановление пароля устарела!';
    }
  },
};
