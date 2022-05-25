export const configuration = () => ({
  BASE_URL: process.env.REACT_APP_API_URI || 'http://localhost:4000/api/',
  AUTH_URL: process.env.REACT_APP_AUTH_URI || 'http://localhost:4100/api/',
});
