import instance from './axios';

export const putComment = async (id: number, content: string) => {
  const response = await instance.put(`comments/${id}`, { content: content });
  if (response.status === 200) {
    alert('성공적!');
  } else if (response.status !== 500) {
    alert(response.data.message);
  } else {
    alert('연결 상태가 좋지 않습니다');
  }
};
export const deleteComment = async (id: number) => {
  const response = await instance.delete(`comments/${id}`);
  if (response.status === 204) {
    return alert('삭제 성공적');
  }
  if (response.status === 403) {
    return alert(response.data.message);
  }
  return null;
};

export const postComment = async (data: { content: string; cardId: number; columnId: number; dashboardId: number }) => {
  const response = await instance.post(`comments`, data);
  return response;
};
