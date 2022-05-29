export const configuration = () => ({
  BASE_URL: process.env.REACT_APP_API_URI || 'http://server:4000/api/',
  AUTH_URL: process.env.REACT_APP_AUTH_URI || 'http://auth:4100/api/',
});
