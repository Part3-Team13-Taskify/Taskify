import instance from '@/src/util/axios';

const deleteTask = async (id: number) => {
  const response = await instance.delete(`cards/${id}`);
  if (response.status === 204) alert('삭제 성공');
};

export default deleteTask;
