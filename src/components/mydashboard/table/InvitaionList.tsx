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
      <div className="grid grid-cols-3 items-center py-26 pl-64 mobile:grid mobile:grid-rows-3 mobile:grid-cols-1 mobile:pl-28 mobile:justify-start mobile:gap-10">
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
      <hr />
    </>
  );
};

export default InvitationList;
