import { authRepository } from '../repositories/auth-repository';

class UserExistsMiddleware {
  async byEmail(email: string) {
    const isFounded = await authRepository.getByEmail(email);
    if (!isFounded) {
      throw 'User not found';
    }
  }

  async byRecoveryCode(recoveryCode: string) {
    const isFounded = await authRepository.getByRecoveryCode(recoveryCode);
    if (!isFounded) {
      throw 'Ссылка на восстановление пароля устарела!';
    }
  }
}

export const userExistsMiddleware = new UserExistsMiddleware();
