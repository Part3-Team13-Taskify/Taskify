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
