import axios from '@/src/util/axios';

interface Inviter {
  nickname: string;
  email: string;
  id: number;
}

interface Dashboard {
  title: string;
  id: number;
}

interface Invitee {
  nickname: string;
  email: string;
  id: number;
}

interface Invitation {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: Dashboard;
  invitee: Invitee;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationsResponse {
  cursorId: number;
  invitations: Invitation[];
}

export const fetchInvitations = async (size: number, cursorId: number | null = null): Promise<InvitationsResponse> => {
  const cursorQuery = cursorId ? `&cursorId=${cursorId}` : '';
  try {
    if (localStorage.getItem('accessToken')) {
      const response = await axios.get<InvitationsResponse>(`invitations?size=${size}${cursorQuery}`);
      return response.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error('Failed to fetch invitations');
    } else {
      console.error(error);
      throw new Error('알 수 없는 에러 발생');
    }
  }
};
