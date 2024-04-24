import axios from '../util/axios';

interface ColumnData {
  title: string;
  dashboardId: number | undefined;
}

export const postColumns = async (columnData: ColumnData) => {
  try {
    const response = await axios.post('columns', columnData);
    console.log('Response data:', response.data);
    // return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error posting Columns data:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
};

export const getColumns = async (dashboardId: number) => {
  try {
    const response = await axios.get(`columns?dashboardId=${dashboardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching columns', error);
    return [];
  }
};
