import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-13/',
});

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTk5MywidGVhbUlkIjoiNC0xMyIsImlhdCI6MTcxMzcxMzk0NiwiaXNzIjoic3AtdGFza2lmeSJ9.r2xKX_D4sv3R77JjPt--Wm9dGycyzusV6s9nnXtYz74';

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
