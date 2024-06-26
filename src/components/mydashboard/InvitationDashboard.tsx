import React, { useState, useEffect } from 'react';
import fetchInvitations from '@/src/pages/api/getInvitationApi';
import unsubscribeEmail from '@/public/assets/icon/unsubscribeEmail.svg';
import MyDashboardList from '@/src/components/mydashboard/MyDashboardList';
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
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    const fetchAndSetInvitations = async () => {
      try {
        const response = await fetchInvitations(10);
        if (response) {
          setInvitations(response.invitations);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSetInvitations();
  }, []);

  return (
    <div className="flex flex-col bg-gray-fa min-h-[calc(100vh-7.8rem)]">
      <div className=" gap-12 mt-40 ml-40 mr-40 mobile:mx-24">
        <MyDashboardList />
      </div>

      <div className="max-w-1022 h-auto mx-40 my-40 py-32 rounded-lg bg-white mobile:mx-24 ">
        <h1 className="self-start pl-28 text-24 font-bold mobile:text-20">초대받은 대시보드</h1>
        {invitations.length > 0 ? (
          <>
            <InvitationSearch />
            <InvitationTable invitations={invitations} setInvitations={setInvitations} />
          </>
        ) : (
          <div className="flex flex-col items-center mt-66 mb-66">
            <Image src={unsubscribeEmail} alt="unsubscribeEmail " className="mb-24" />
            <p className="text-18 font-normal text-gray-9f mobile:text-14">아직 초대받은 대시보드가 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationDashboard;
