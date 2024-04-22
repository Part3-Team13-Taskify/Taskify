import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-13/',
});

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTk5MywidGVhbUlkIjoiNC0xMyIsImlhdCI6MTcxMzcxMzk0NiwiaXNzIjoic3AtdGFza2lmeSJ9.r2xKX_D4sv3R77JjPt--Wm9dGycyzusV6s9nnXtYz74';

instance.interceptors.request.use((config) => {
  const modifiedConfig = { ...config };
  modifiedConfig.headers.Authorization = `Bearer ${token}`;
  return modifiedConfig;
});

export default instance;