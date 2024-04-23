import instance from '@/src/util/axios';
import { useRouter } from 'next/router';

export const getMembers = async (id: number) => {
  const response = await instance.get(`/members?page=1&size=20&dashboardId=${id}`);
  return response.data.members;
};

export const getInvitees = async (id: number) => {
  const response = await instance.get(`/dashboards/${id}/invitations?page=1&size=10`);
  return response.data.invitations;
};

export const getDashboard = async (id: number) => {
  const response = await instance.get(`/dashboards/${id}`);
  return response.data;
};

export const handleDeleteDashboard = async (id: number) => {
  const router = useRouter();
  await instance.delete(`/dashboards/${id}`);
  router.push('/my-dashboard');
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
