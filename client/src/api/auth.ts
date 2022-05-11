import { instanceAuth } from './config';

export type UserRoleType = 'ADMIN' | 'USER' | 'MODERATOR';

export type UserType = {
  id: number;
  email: string;
  emailConfig: {
    recoveryCode: string;
  };
  nickname: string;
  passwordHash: string;
  role: UserRoleType;
  lvlPoint: number;
  money: number;
  popularPoint: number;
  updated: Date;
  created: Date;
};

export const apiAuth = {
  checkLogin() {
    return instanceAuth.post<UserType>('auth/me', {});
  },
  login(email: string, password: string) {
    return instanceAuth.post<{ token: string }>('auth/login', { email, password });
  },
  registration(email: string, password: string, nickname: string) {
    return instanceAuth.post('auth/registration', { email, password, nickname });
  },
  passwordRecovery(email: string) {
    return instanceAuth.post('auth/password-recovery', { email });
  },
};
