import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URI || 'http://localhost:4000/api/';
const AUTH_URL = process.env.REACT_APP_AUTH_URI || 'http://localhost:4100/api/';

export const instance = axios.create({
  baseURL: BASE_URL,
});

function getToken() {
  const token = localStorage.getItem('token');
  return token || '';
}

export const instanceAuth = axios.create({
  baseURL: AUTH_URL,
});

instanceAuth.interceptors.request.use((config) => {
  if (config.headers) config.headers['authorization'] = getToken();

  return config;
});
