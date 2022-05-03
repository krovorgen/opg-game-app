import { instance, instanceAuth } from './config';

export type UserRoleType = 'ADMIN' | 'USER' | 'MODERATOR';

export type UserType = {
  id: number;
  email: string;
  nickname: string;
  // passwordHash: string;
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
    return instance.post<{ token: string }>('auth/login', { email, password });
  },
  registration(email: string, password: string, nickname: string) {
    return instance.post('auth/registration', { email, password, nickname });
  },
};
