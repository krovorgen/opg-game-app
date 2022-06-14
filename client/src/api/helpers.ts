import { Api } from './api';

class ApiHelpers extends Api {
  checkPing() {
    return this.instance.post<{ ping: string }>('ping', { frontTime: new Date() });
  }
}

export const apiHelpers = new ApiHelpers();
