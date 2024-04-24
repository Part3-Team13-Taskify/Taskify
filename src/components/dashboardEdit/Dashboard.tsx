import Image from 'next/image';
import add from '@/public/assets/icon/addWhite.svg';
import instance from '@/src/util/axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getInvitees, getMembers, handleCancelInvitation, handleDeleteMember } from '@/src/pages/api/dashboardEditApi';
import { useDashboardStore, useMembersStore } from '@/src/util/zustand';
import ColorPicker from '../common/colorpicker';
import Button from '../common/button';
import Table from './table';
import TableHeader from './table/TableHeader';
import TableList from './table/TableList';
import DashboardCard from './DashboardCard';
import Input, { InputForm } from '../common/input';

// type DashboardData = {
//   title: string;
//   color: string;
//   createdByMe: boolean;
// };

// type Members = {
//   id: number;
//   email: string;
//   nickname: string;
//   profileImageUrl: string;
//   isOwner: boolean;
//   userId: number;
// };

type Invitees = {
  email: string;
};

const Dashboard = () => {
  // const [dashboard, setDashboard] = useState<DashboardData>({ title: '', color: '', createdByMe: false });
  const dashboard = useDashboardStore((state) => state.dashboardData);
  const setDashboard = useDashboardStore((state) => state.setDashboardData);
  const members = useMembersStore((state) => state.membersData);
  const setMembers = useMembersStore((state) => state.setMembersData);
  // const [members, setMembers] = useState<Members>({
  //   id: 0,
  //   email: '',
  //   nickname: '',
  //   profileImageUrl: '',
  //   isOwner: false,
  //   userId: 0,
  // });
  const [invitees, setInvitees] = useState<Invitees>({ email: '' });
  const { register, getValues, handleSubmit } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const [selectedColor, setSelectedColor] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);

  const fetchData = async () => {
    if (idNumber) {
      const membersData = await getMembers(idNumber);
      const inviteesData = await getInvitees(idNumber);
      // const dashboardData = await getDashboard(idNumber);
      setMembers(membersData);
      setInvitees(inviteesData);
      setSelectedColor(dashboard.color);
      // setDashboard(dashboardData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, router]);

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
        <TableHeader title="구성원" />
        <Table label="이름">
          {Array.isArray(members) &&
            members.map((member) => (
              <TableList
                src={member.profileImageUrl}
                text={member.nickname}
                isOwner={member.isOwner}
                key={member.userId}
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
                text={invitee.invitee.email}
                button={
                  <Button
                    buttonType="delete"
                    textColor="violet"
                    bgColor="white"
                    onClick={() => handleCancelInvitation(idNumber, invitee.dashboard.id)}
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
