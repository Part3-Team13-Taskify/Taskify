import React, { useState } from 'react';
import Button from '@/src/components/common/button';
import addLarge from '@/public/assets/chip/addLarge.svg';
import unsubscribeEmail from '@/public/assets/icon/unsubscribeEmail.svg';
import AddDashboardModal from '@/src/components/dashboardModal/addDashboardModal';
import Image from 'next/image';

const InvitationDashboard = () => {
  const [isAddDashboardModalVisible, setIsAddDashboardModalVisible] = useState(false);

  const showAddDashboardModal = () => {
    setIsAddDashboardModalVisible(true);
  };

  const hideAddDashboardModal = () => {
    setIsAddDashboardModalVisible(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-12 mt-40 ml-40 mobile:mx-24">
<<<<<<< HEAD
        <Button
          buttonType="dashboardAdd"
          bgColor="white"
          textColor="black"
          type="button"
          onClick={showAddDashboardModal}
        >
=======
        <Button buttonType="dashboardAdd" bgColor="white" textColor="black" type="button">
>>>>>>> d0924e1 (🐛 Fix: mydashboard페이지 반응형 수정)
          새로운 대시보드
          <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
        </Button>
      </div>
<<<<<<< HEAD
      {isAddDashboardModalVisible && (
        <AddDashboardModal openModal={isAddDashboardModalVisible} handleModalClose={hideAddDashboardModal} />
      )}
=======

>>>>>>> d0924e1 (🐛 Fix: mydashboard페이지 반응형 수정)
      <div className="w-1022 h-400 mt-40 mx-40 rounded-lg  bg-white tablet:w-504 tablet:h-400 mobile:260-full mobile-h:400 mobile:mx-24 ">
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
