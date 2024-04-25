import instance from '@/src/util/axios';

export const getMembers = async (id: number, offset: number = 1) => {
  try {
    const response = await instance.get(`/members?page=${offset}&size=4&dashboardId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getTotalMembers = async (id: number) => {
  try {
    const response = await instance.get(`/members?page=1&size=20&dashboardId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getInvitees = async (id: number, offset: number = 1) => {
  try {
    const response = await instance.get(`/dashboards/${id}/invitations?page=${offset}&size=4`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getDashboard = async (id: number) => {
  try {
    const response = await instance.get(`/dashboards/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const handleDeleteMember = async (userId: number, onMemberDeletion: (userId: number) => void) => {
  const confirmDeletion = window.confirm('멤버를 삭제할까요?');
  if (!confirmDeletion) return;

  try {
    await instance.delete(`/members/${userId}`);
    alert('멤버를 삭제했습니다.');
    onMemberDeletion(userId);
  } catch (error) {
    console.error(error);
  }
};

export const handleCancelInvitation = async (
  id: number,
  invitationId: number,
  onInvitationCancelled: (invitationId: number) => void,
) => {
  const confirmDeletion = window.confirm('초대를 취소할까요?');
  if (!confirmDeletion) return;

  try {
    await instance.delete(`/dashboards/${id}/invitations/${invitationId}`);
    alert('초대를 취소했습니다.');
    onInvitationCancelled(invitationId);
  } catch (error) {
    console.error(error);
  }
};

export const getMyProfile = async () => {
  try {
    const response = await instance.get(`/users/me`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getDashboardList = async (offset: number = 1) => {
  try {
    const response = await instance.get(`/dashboards?navigationMethod=pagination&page=${offset}&size=10`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
