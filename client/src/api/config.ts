import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URI || 'http://localhost:4000/api/';

export const instance = axios.create({
  baseURL: BASE_URL,
});
