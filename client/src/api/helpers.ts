import { instance } from './config';

type CheckPingResponse = {
  ping: string;
};

export const apiHelpers = {
  checkPing() {
    return instance.post<CheckPingResponse>('ping', { frontTime: new Date() });
  },
};
