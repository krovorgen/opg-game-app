import { Api } from './api';
import { getToken } from '../helpers/getToken';

class ApiAuth extends Api {
  checkLogin() {
    return this.instanceAuth.post<UserType>('auth/me', {});
  }
  login(email: string, password: string) {
    return this.instanceAuth.post<{ token: string }>('auth/login', { email, password });
  }
  registration(registrationData: RegistrationData) {
    return this.instanceAuth.post<{ token: string }>('auth/registration', registrationData);
  }
  passwordRecovery(email: string) {
    return this.instanceAuth.post('auth/password-recovery', { email });
  }
  setNewPassword(recoveryCode: string, newPassword: string) {
    return this.instanceAuth.post('auth/set-new-password', { recoveryCode, newPassword });
  }
}

export const apiAuth = new ApiAuth();
apiAuth.instanceAuth.interceptors.request.use((config) => {
  if (config.headers) config.headers['authorization'] = getToken();

  return config;
});

export enum UserRoleType {
  admin = 'ADMIN',
  user = 'USER',
  moderator = 'MODERATOR',
}

export enum SexType {
  woman = 'woman',
  male = 'male',
}

export type UserType = {
  id: number;
  email: string;
  nickname: string;
  role: UserRoleType;
  lvlPoint: number;
  money: number;
  popularPoint: number;
  updated: Date;
  created: Date;
  sex: SexType;
};

export type RegistrationData = { email: string; password: string; nickname: string; sex: SexType };
