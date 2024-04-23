import { ReactNode } from 'react';
import InvitationList from '../table/InvitaionList';
import Button from '@/src/components/common/button';

const InvitationTable = () => {
  return (
    <div className="no-hover-scrollbar">
      <div className="flex justify-between mt-24 pl-28 pr-284 text-gray-9f mobile:hidden">
        <p>이름</p>
        <p>초대자</p>
        <p>수락 여부</p>
      </div>
      <div className="flex flex-col overflow-scroll h-336 scrollbar-hide no-hover-scrollbar tablet:h-190 mobile:h-screen">
        <InvitationList
          nickname="rlarla"
          inviter="rlarlarlarla"
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
        <InvitationList
          nickname="rlarla"
          inviter="rlarlarlarla"
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
        <InvitationList
          nickname="rlarla"
          inviter="rlarlarlarla"
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
        <InvitationList
          nickname="rlarla"
          inviter="rlarlarlarla"
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
      </div>
    </div>
  );
};

export default InvitationTable;
