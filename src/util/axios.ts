import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-13/',
});

const getToken = () => {
  if (typeof window !== undefined) {
    const token = window.localStorage.getItem('accessToken');
    return token;
  }
  return '';
};

instance.interceptors.request.use((config) => {
  const modifiedConfig = { ...config };
  modifiedConfig.headers.Authorization = `Bearer ${getToken()}`;
  return modifiedConfig;
});

export default instance;
