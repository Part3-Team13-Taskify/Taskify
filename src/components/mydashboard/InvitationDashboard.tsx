import Button from '@/src/components/common/button';
import addLarge from '@/public/assets/chip/addLarge.svg';
import unsubscribeEmail from '@/public/assets/icon/unsubscribeEmail.svg';
import Image from 'next/image';

const InvitationDashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-12 mt-40 ml-40">
        <Button buttonType="dashboardAdd" bgColor="white" textColor="black" type="button">
          새로운 대시보드
          <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
        </Button>
      </div>
      <div className="w-1022 h-400 mt-40 mx-40 rounded-lg  bg-white tablet:w-full tablet:h-400 mobile:w-full mobile-h:400 mobile:mx-24 ">
        <h1 className="self-start pt-32 pl-28 text-24 font-bold mobile:text-20">초대받은 대시보드</h1>
        <div className="flex flex-col items-center mt-66">
          <Image src={unsubscribeEmail} alt="unsubscribeEmail " className="mb-24" />
          <p className="text-18 font-normal text-gray-9f mobile:text-14">아직 초대받은 대시보드가 없어요</p>
        </div>
      </div>
    </div>
  );
};

export default InvitationDashboard;
