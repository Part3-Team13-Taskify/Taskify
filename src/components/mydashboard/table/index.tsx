import React, { useState, useEffect, useCallback } from 'react';
import { fetchInvitations } from '@/src/pages/api/getInvitationApi';
import { putInvitation } from '@/src/pages/api/putInvitationApi';
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

interface InvitationTableProps {
  invitations: Invitation[]; // 초대 목록 배열
  setInvitations: React.Dispatch<React.SetStateAction<Invitation[]>>; // 초대 목록 배열을 업데이트하는 함수
}

const InvitationTable: React.FC<InvitationTableProps> = ({ invitations, setInvitations }) => {
  const [loading, setLoading] = useState(false);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const handleInvitationResponse = async (invitationId: number, accept: boolean) => {
    try {
      setLoading(true);
      await putInvitation(invitationId, accept);

      setInvitations((currentInvitations) =>
        currentInvitations.map((invite) =>
          invite.id === invitationId ? { ...invite, inviteAccepted: accept } : invite,
        ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadInvitations = useCallback(
    async (initialLoad = false) => {
      if (loading && !initialLoad) return;

      setLoading(true);
      try {
        const response = await fetchInvitations(10, cursorId);
        setInvitations((prevInvitations) => [...prevInvitations, ...response.invitations]);
        const newInvitations = initialLoad
          ? response.invitations
          : [
              ...invitations.filter((inv) => response.invitations.every((newInv) => newInv.id !== inv.id)),
              ...response.invitations,
            ];
        setInvitations(newInvitations);
        setCursorId(response.cursorId);
        setHasMore(response.invitations.length === 10);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
      setLoading(false);
    },
    [cursorId, loading, invitations],
  );

  useEffect(() => {
    loadInvitations(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      ) {
        return;
      }
      loadInvitations();
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, loadInvitations]);

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
            key={invitation.id}
            nickname={invitation.dashboard.title}
            inviter={invitation.inviter.nickname}
            acceptButton={
              <Button
                buttonType="decision"
                bgColor="violet"
                textColor="white"
                onClick={() => handleInvitationResponse(invitation.id, true)}
              >
                수락
              </Button>
            }
            rejectButton={
              <Button
                buttonType="decision"
                textColor="violet"
                className="outline outline-1 outline-gray-d9"
                onClick={() => handleInvitationResponse(invitation.id, false)}
              >
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
