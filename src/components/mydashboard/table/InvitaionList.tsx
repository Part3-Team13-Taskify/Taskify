import { ReactNode } from 'react';

interface InvitationListProps {
  nickname: string;
  inviter: string;
  acceptButton: ReactNode;
  rejectButton: ReactNode;
}
const InvitationList = ({ nickname, inviter, acceptButton, rejectButton }: InvitationListProps) => {
  return (
    <>
      <div className="flex justify-between py-26 pl-64 pr-166 mobile:flex-col gap-10">
        <div className="flex gap-16">
          <p className="hidden mobile:inline text-16 text-gray-9f">이름</p>
          {nickname}
        </div>
        <div className="flex gap-16">
          <p className="hidden mobile:inline text-16 text-gray-9f">초대자</p>
          {inviter}
        </div>
        <div className="flex gap-10">
          {acceptButton}
          {rejectButton}
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default InvitationList;
