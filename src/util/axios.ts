import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-13/',
});

const token = window.localStorage.getItem('accessToken');

instance.interceptors.request.use((config) => {
  const modifiedConfig = { ...config };
  modifiedConfig.headers.Authorization = `Bearer ${token}`;
  return modifiedConfig;
});

export default instance;
