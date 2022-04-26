import { instance } from './config';

export type UserRoleType = 'ADMIN' | 'USER' | 'MODERATOR';

export type UserType = {
  id: number;
  login: string;
  nickname: string;
  passwordSalt: string;
  passwordHash: string;
  role: UserRoleType;
  lvlPoint: number;
  money: number;
  popularPoint: number;
  updated: Date;
  created: Date;
};

export const authAPI = {
  checkLogin() {
    return instance.get('auth/me');
  },
  login(login: string, password: string) {
    return instance.post('auth/login', { login, password });
  },
  registration(login: string, password: string, nickname: string) {
    return instance.post('auth/registration', { login, password, nickname });
  },
};
