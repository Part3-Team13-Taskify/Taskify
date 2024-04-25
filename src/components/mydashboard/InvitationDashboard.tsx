import React, { useState, useEffect } from 'react';
import { fetchInvitations } from '@/src/pages/api/getInvitationApi';
import Button from '@/src/components/common/button';
import addLarge from '@/public/assets/chip/addLarge.svg';
import unsubscribeEmail from '@/public/assets/icon/unsubscribeEmail.svg';
import AddDashboardModal from '@/src/components/dashboardModal/addDashboardModal';
import InvitationTable from '@/src/components/mydashboard/table/';
import InvitationSearch from '@/src/components/mydashboard/table/InvitationSearch';
import Image from 'next/image';

interface Inviter {
  nickname: string;
  email: string;
  id: number;
}

interface Dashboard {
  title: string;
  id: number;
}

interface Invitation {
  id: number;
  inviter: Inviter;
  dashboard: Dashboard;
}

const InvitationDashboard = () => {
  const [isAddDashboardModalVisible, setIsAddDashboardModalVisible] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const showAddDashboardModal = () => {
    setIsAddDashboardModalVisible(true);
  };

  const hideAddDashboardModal = () => {
    setIsAddDashboardModalVisible(false);
  };

  useEffect(() => {
    const fetchAndSetInvitations = async () => {
      try {
        const response = await fetchInvitations(10);
        setInvitations(response.invitations);
      } catch (error) {
        console.error('초대 목록을 불러오는 데 실패했습니다.', error);
      }
    };

    fetchAndSetInvitations();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex gap-12 mt-40 ml-40 mobile:mx-24">
        <Button
          buttonType="dashboardAdd"
          bgColor="white"
          textColor="black"
          type="button"
          onClick={showAddDashboardModal}
        >
          새로운 대시보드
          <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
        </Button>
      </div>
      {isAddDashboardModalVisible && (
        <AddDashboardModal openModal={isAddDashboardModalVisible} handleModalClose={hideAddDashboardModal} />
      )}
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="w-1022 h-auto mx-40 my-40 py-32 rounded-lg bg-white tablet:w-screen tablet:h-400 mobile:mx-24 mobile:h-screen">
        <h1 className="self-start pl-28 text-24 font-bold mobile:text-20">초대받은 대시보드</h1>
        {invitations.length > 0 ? (
          <>
            <InvitationSearch />
            <InvitationTable invitations={invitations} setInvitations={setInvitations} />
          </>
        ) : (
          <div className="flex flex-col items-center mt-66">
            <Image src={unsubscribeEmail} alt="unsubscribeEmail " className="mb-24" />
            <p className="text-18 font-normal text-gray-9f mobile:text-14">아직 초대받은 대시보드가 없어요</p>
          </div>
        )}
<<<<<<< HEAD
=======
      <div className="w-1022 h-auto mx-40 my-40 py-32 rounded-lg  bg-white tablet:w-screen tablet:h-400 mobile:screen mobile:mx-24 mobile:h-screen">
=======
      <div className="w-1022 h-auto mx-40 my-40 py-32 rounded-lg bg-white tablet:w-screen tablet:h-400 mobile:mx-24 mobile:h-screen">
>>>>>>> d6d728a (✨ Feat: 초대목록조회 API 연결)
        <h1 className="self-start pl-28 text-24 font-bold mobile:text-20">초대받은 대시보드</h1>
        {/* <div className="flex flex-col items-center mt-66">
          <Image src={unsubscribeEmail} alt="unsubscribeEmail " className="mb-24" />
          <p className="text-18 font-normal text-gray-9f mobile:text-14">아직 초대받은 대시보드가 없어요</p>
        </div> */}
        <InvitationSearch />
        <div className="">
          <InvitationTable />
        </div>
>>>>>>> 7577910 (✨ Feat: InvitationTable UI)
=======
>>>>>>> b23c7a1 (✨ Feat: 초대목록 유무에 따라 UI 다르게)
      </div>
    </div>
  );
};

export default InvitationDashboard;
