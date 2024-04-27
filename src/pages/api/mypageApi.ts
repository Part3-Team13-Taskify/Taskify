import instance from '@/src/util/axios';
import axios from 'axios';

interface profileProps {
  nickname: string | undefined;
  profileImageUrl?: string;
}

interface passwordCheckProps {
  password: string;
  newPassword: string;
}

export const getMyPageProfile = async () => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await instance.get('users/me');
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const postMyPageProfile = async (data: FormData) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await instance.post('users/me/image', data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const putMyPageProfile = async (data: profileProps) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await instance.put('users/me', data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const putMyPagePasswordChange = async (data: passwordCheckProps) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await instance.put('auth/password', data);
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
  }
  return false;
};
