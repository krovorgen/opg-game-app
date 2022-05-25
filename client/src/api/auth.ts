import { instanceAuth } from './config';

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

export const apiAuth = {
  checkLogin() {
    return instanceAuth.post<UserType>('auth/me', {});
  },
  login(email: string, password: string) {
    return instanceAuth.post<{ token: string }>('auth/login', { email, password });
  },
  registration(registrationData: RegistrationData) {
    return instanceAuth.post<{ token: string }>('auth/registration', registrationData);
  },
  passwordRecovery(email: string) {
    return instanceAuth.post('auth/password-recovery', { email });
  },
  setNewPassword(recoveryCode: string, newPassword: string) {
    return instanceAuth.post('auth/set-new-password', { recoveryCode, newPassword });
  },
};
