import { instance } from './config';

export const apiHelpers = {
  checkPing() {
    return instance.post<{ ping: string }>('ping', { frontTime: new Date() });
  },
};
