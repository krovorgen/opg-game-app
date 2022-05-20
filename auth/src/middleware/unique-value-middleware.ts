import { authRepository } from '../repositories/auth-repository';

class UniqueValueMiddleware {
  async nickname(nickname: string) {
    const isFounded = await authRepository.getByNickname(nickname);
    if (isFounded) {
      throw 'This nickname is already registered in the system';
    }
  }
  async email(email: string) {
    const isFounded = await authRepository.getByEmail(email);
    if (isFounded) {
      throw 'This email is already registered in the system';
    }
  }
}

export const uniqueValueMiddleware = new UniqueValueMiddleware();
