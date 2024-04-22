import Image from 'next/image';
import add from '@/public/assets/icon/addWhite.svg';
import instance from '@/src/util/axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import ColorPicker from '../common/colorpicker';
import Button from '../common/button';
import Table from './table';
import TableHeader from './table/TableHeader';
import TableList from './table/TableList';
import DashboardCard from './DashboardCard';
import Input, { InputForm } from '../common/input';

type DashboardData = {
  title: string;
  color: string;
  createdByMe: boolean;
};

type Members = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
  userId: number;
};

type Invitees = {
  email: string;
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({ title: '', color: '', createdByMe: false });
  const [members, setMembers] = useState<Members>({
    id: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
    isOwner: false,
    userId: 0,
  });
  const [invitees, setInvitees] = useState<Invitees>({ email: '' });
  const { register, getValues, handleSubmit } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const [selectedColor, setSelectedColor] = useState<string>(dashboardData.color);

  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const getDashboard = async () => {
    try {
      // const response = await instance.get('/dashboards?navigationMethod=pagination&page=1&size=10');
      const response = await instance.get(`/dashboards/${id}`);

      console.log(response.data);
      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      // const response = await instance.get('/dashboards?navigationMethod=pagination&page=1&size=10');
      const response = await instance.get(`/members?page=1&size=20&dashboardId=${id}`);

      console.log(response.data.members[0]);
      setMembers(response.data.members);
    } catch (error) {
      console.error(error);
    }
  };

  const getInvitees = async () => {
    try {
      // const response = await instance.get('/dashboards?navigationMethod=pagination&page=1&size=10');
      const response = await instance.get(`/dashboards/${id}/invitations?page=1&size=10`);

      console.log(response.data.invitations[0]);
      setInvitees(response.data.invitations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDashboard();
    getMembers();
    getInvitees();
  }, [id]);

  const handleDeleteDashboard = async () => {
    try {
      await instance.delete(`/dashboards/${id}`);
      router.push('/my-dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMember = async ({ userId }: { userId: number }) => {
    try {
      await instance.delete(`/members/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelInvitation = async ({ invitationId }: { invitationId: number }) => {
    try {
      await instance.delete(`/dashboards/${id}/invitations/${invitationId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditDashboard = async () => {
    const dashboardTitle = getValues('text') || '';
    try {
      const data = { title: dashboardTitle, color: selectedColor };
      await instance.put(`/dashboards/${id}`, data);
      getDashboard();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-25 tablet:gap-12">
      <DashboardCard>
        <div className="flex justify-between">
          <p className="font-bold text-20">{dashboardData.title}</p>
          {/* <ColorPicker color={dashboardData.color} /> */}
          <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>
        <form onSubmit={handleSubmit(handleEditDashboard)}>
          <Input
            inputName="text"
            inputContent={dashboardData.title}
            labelId="text"
            labelText="대시보드 이름"
            type="text"
            register={register('text', {
              required: {
                value: true,
                message: '대시보드 이름을 입력해주세요',
              },
            })}
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
                button={
                  <Button
                    buttonType="delete"
                    textColor="violet"
                    bgColor="white"
                    onClick={() => handleDeleteMember(member.userId)}
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
                    onClick={() => handleCancelInvitation(invitee.dashboard.id)}
                  >
                    취소
                  </Button>
                }
              />
            ))}
        </Table>
      </DashboardCard>
      <Button buttonType="dashboardDelete" bgColor="white" className="mt-25" onClick={handleDeleteDashboard}>
        대시보드 삭제하기
      </Button>
    </div>
  );
};

export default Dashboard;
