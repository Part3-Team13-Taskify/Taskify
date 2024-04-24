import instance from '@/src/util/axios';

export const getMembers = async (id: number) => {
  try {
    const response = await instance.get(`/members?page=1&size=20&dashboardId=${id}`);
    return response.data.members;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getInvitees = async (id: number) => {
  try {
    const response = await instance.get(`/dashboards/${id}/invitations?page=1&size=10`);
    return response.data.invitations;
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

export const handleDeleteMember = async ({ userId }: { userId: number }) => {
  try {
    await instance.delete(`/members/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

export const handleCancelInvitation = async (id: number, invitationId: number) => {
  try {
    await instance.delete(`/dashboards/${id}/invitations/${invitationId}`);
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

export const getDashboardList = async () => {
  try {
    const response = await instance.get('/dashboards?navigationMethod=pagination&page=1&size=10');
    return response.data.dashboards;
  } catch (error) {
    console.error(error);
  }
  return null;
};
