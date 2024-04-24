import { create } from 'zustand';

type DashboardData = {
  title: string;
  color: string;
  createdByMe: boolean;
};

type DashboardStore = {
  dashboardData: DashboardData;
  setDashboardData: (data: DashboardData) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardData: { title: '', color: '', createdByMe: false },
  setDashboardData: (data) => set(() => ({ dashboardData: data })),
}));

type MembersData = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
  userId: number;
};

type MembersStore = {
  membersData: MembersData[];
  setMembersData: (data: MembersData[]) => void;
};

export const useMembersStore = create<MembersStore>((set) => ({
  membersData: [],
  setMembersData: (data) => set(() => ({ membersData: data })),
}));

type NestedInvitee = {
  id: number;
  email: string;
  nickname: string;
};

type InviteesData = {
  id: number;
  invitee: NestedInvitee;
};

type InviteesStore = {
  inviteesData: InviteesData[];
  setInviteesData: (data: InviteesData[]) => void;
};

export const useInviteesStore = create<InviteesStore>((set) => ({
  inviteesData: [],
  setInviteesData: (data) => set(() => ({ inviteesData: data })),
}));

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
}

type DashboardListStore = {
  dashboardList: Dashboard[];
  setDashboardList: (dashboards: Dashboard[]) => void;
};

export const useDashboardListStore = create<DashboardListStore>((set) => ({
  dashboardList: [],
  setDashboardList: (dashboards) => set({ dashboardList: dashboards }),
}));
