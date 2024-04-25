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
  removeMember: (userId: number) => void;
};

export const useMembersStore = create<MembersStore>((set, get) => ({
  membersData: [],
  setMembersData: (data) => set(() => ({ membersData: data })),
  removeMember: (userId) => {
    const currentMembers = get().membersData;
    const updatedMembers = currentMembers.filter((member) => member.id !== userId);
    set({ membersData: updatedMembers });
  },
}));

type TotalMembersStore = {
  totalMembersData: MembersData[];
  setTotalMembersData: (data: MembersData[]) => void;
};

export const useTotalMembersStore = create<TotalMembersStore>((set) => ({
  totalMembersData: [],
  setTotalMembersData: (data) => set(() => ({ totalMembersData: data })),
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
  removeInvitee: (invitationId: number) => void;
};

export const useInviteesStore = create<InviteesStore>((set, get) => ({
  inviteesData: [],
  setInviteesData: (data) => set(() => ({ inviteesData: data })),
  removeInvitee: (invitationId) => {
    const currentInvitees = get().inviteesData;
    const updatedInvitees = currentInvitees.filter((invitee) => invitee.id !== invitationId);
    set({ inviteesData: updatedInvitees });
  },
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
