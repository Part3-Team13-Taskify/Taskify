import axios from '../../util/axios';

interface ColumnData {
  title: string;
  dashboardId: number | undefined;
}

export const postColumns = async (columnData: ColumnData) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await axios.post('columns', columnData);
      return response.data;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error posting Columns data:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
  return null;
};

export const getColumns = async (dashboardId: number) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await axios.get(`columns?dashboardId=${dashboardId}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching columns', error);
    return [];
  }
  return null;
};

export const putColumns = async (columnId: number | undefined, title: string) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await axios.put(`columns/${columnId}`, { title: title });
      return response.data;
    }
  } catch (error) {
    console.error('Error putting Columns', error);
    throw error;
  }
  return null;
};

export const deleteColumns = async (columnId: number | undefined) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await axios.delete(`columns/${columnId}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error deleting Columns', error);
    throw error;
  }
  return null;
};
