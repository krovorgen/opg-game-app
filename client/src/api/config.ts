import axios from 'axios';
import { configuration } from '../config/configuration';

export const instance = axios.create({
  baseURL: configuration().BASE_URL,
});

export function getToken() {
  const token = localStorage.getItem('token');
  return token || '';
}

export const instanceAuth = axios.create({
  baseURL: configuration().AUTH_URL,
});

instanceAuth.interceptors.request.use((config) => {
  if (config.headers) config.headers['authorization'] = getToken();

  return config;
});
