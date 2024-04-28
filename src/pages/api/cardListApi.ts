import axios from '../../util/axios';

export const getCardList = async ({ column }: { column: number }) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await axios.get(`cards?size=5&columnId=${column}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error getting Cards', error);
    throw error;
  }
};

export const getCardListAdditional = async ({ column, targetId }: { column: number; targetId: number }) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await axios.get(`cards?size=5&cursorId=${targetId}&columnId=${column}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error getting additional Cards', error);
    throw error;
  }
};
