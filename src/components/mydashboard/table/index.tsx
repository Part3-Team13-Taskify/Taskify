import React, { useState, useEffect } from 'react';
import { fetchInvitations } from '@/src/pages/api/getInvitationApi';
import InvitationList from '@/src/components/mydashboard/table/InvitaionList';
import Button from '@/src/components/common/button';

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

export const InvitationTable = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    fetchInvitations(10)
      .then((response) => setInvitations(response.invitations))
      .catch((error) => console.error('Error fetching invitations:', error));
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-24 pl-28 pr-284 text-gray-9f mobile:hidden">
        <p>이름</p>
        <p>초대자</p>
        <p>수락 여부</p>
      </div>
      <div className="flex flex-col overflow-y-scroll h-340 tablet:h-190 mobile:h-300">
        {invitations.map((invitation) => (
          <InvitationList
            nickname={invitation.dashboard.title}
            inviter={invitation.inviter.nickname}
            acceptButton={
              <Button buttonType="decision" bgColor="violet" textColor="white">
                수락
              </Button>
            }
            rejectButton={
              <Button buttonType="decision" textColor="violet" className="outline outline-1 outline-gray-d9">
                거절
              </Button>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default InvitationTable;
