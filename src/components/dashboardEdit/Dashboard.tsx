import Image from 'next/image';
import add from '@/public/assets/icon/addWhite.svg';
import instance from '@/src/util/axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { handleCancelInvitation, handleDeleteMember } from '@/src/pages/api/dashboardEditApi';
import { useDashboardStore, useMembersStore, useInviteesStore } from '@/src/util/zustand';
import ColorPicker from '../common/colorpicker';
import Button from '../common/button';
import Table from './table';
import TableHeader from './table/TableHeader';
import TableList from './table/TableList';
import DashboardCard from './DashboardCard';
import Input, { InputForm } from '../common/input';
import MembersPagination from './table/MembersPagination';
import InviteePagination from './table/InviteePagination';

const Dashboard = () => {
  const dashboard = useDashboardStore((state) => state.dashboardData);
  const setDashboard = useDashboardStore((state) => state.setDashboardData);
  const members = useMembersStore((state) => state.membersData);
  const invitees = useInviteesStore((state) => state.inviteesData);
  const { register, getValues, handleSubmit } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const [selectedColor, setSelectedColor] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);

  const handleEditDashboard = async () => {
    const dashboardTitle = getValues('text') || '';
    try {
      const data = { title: dashboardTitle, color: selectedColor };
      await instance.put(`/dashboards/${idNumber}`, data).then((res) => setDashboard(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDashboard = async () => {
    await instance.delete(`/dashboards/${idNumber}`);
    router.push('/my-dashboard');
  };

  return (
    <div className="flex flex-col gap-25 tablet:gap-12">
      <DashboardCard>
        <div className="flex justify-between">
          <p className="font-bold text-20">{dashboard.title}</p>
          <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>
        <form onSubmit={handleSubmit(handleEditDashboard)}>
          <Input
            inputName="text"
            inputContent={dashboard.title}
            labelId="text"
            labelText="대시보드 이름"
            type="text"
            register={register('text', {})}
            inputCheckStyle="flex my-10"
            labelDropStyle="w-full"
          />
          <div className="flex justify-end">
            <Button
              buttonType="modal1"
              type="submit"
              bgColor="violet"
              textColor="white"
              onClick={handleSubmit(handleEditDashboard)}
            >
              변경
            </Button>
          </div>
        </form>
      </DashboardCard>

      <DashboardCard className="px-0 pb-0">
        <TableHeader title="구성원">
          <MembersPagination />
        </TableHeader>
        <Table label="이름">
          {Array.isArray(members) &&
            members.map((member) => (
              <TableList
                key={member.userId}
                src={member.profileImageUrl}
                text={member.nickname}
                isOwner={member.isOwner}
                button={
                  <Button
                    buttonType="delete"
                    textColor="violet"
                    bgColor="white"
                    onClick={() => handleDeleteMember({ userId: member.userId })}
                  >
                    삭제
                  </Button>
                }
              />
            ))}
        </Table>
      </DashboardCard>

      <DashboardCard className="px-0 pb-0 relative">
        <TableHeader title="초대 내역">
          <InviteePagination />
          <Button
            buttonType="modal1"
            bgColor="violet"
            textColor="white"
            className="mobile:absolute mobile:right-20 mobile:top-90 w-105"
          >
            <div className="flex gap-6 items-center justify-center ">
              <Image src={add} alt="add" />
              초대하기
            </div>
          </Button>
        </TableHeader>
        <Table label="이메일">
          {Array.isArray(invitees) &&
            invitees.map((invitee) => (
              <TableList
                key={invitee.invitee.id}
                text={invitee.invitee.email}
                button={
                  <Button
                    buttonType="delete"
                    textColor="violet"
                    bgColor="white"
                    onClick={() => handleCancelInvitation(idNumber, invitee.id)}
                  >
                    취소
                  </Button>
                }
              />
            ))}
        </Table>
      </DashboardCard>
      <Button buttonType="dashboardDelete" bgColor="white" className="mt-25" onClick={() => handleDeleteDashboard()}>
        대시보드 삭제하기
      </Button>
    </div>
  );
};

export default Dashboard;
