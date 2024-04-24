import Image from 'next/image';
import logo from '@/public/assets/logo/violetHeaderLogo.svg';
import add from '@/public/assets/icon/addBox.svg';
import mobileLogo from '@/public/assets/logo/violetHeaderMobileLogo.svg';
import { useState } from 'react';
import AddDashboardModal from '@/src/components/dashboardModal/addDashboardModal';
import DashboardList from './DashboardList';

const SideBar = () => {
  const [isAddDashboardModalVisible, setIsAddDashboardModalVisible] = useState(false);
  const showAddDashboardModal = () => {
    setIsAddDashboardModalVisible(true);
  };
  const hideAddDashboardModal = () => {
    setIsAddDashboardModalVisible(false);
  };
  return (
    <div className="top-0 left-0 w-300 h-screen border-1 bg-white pt-20 px-24 tablet:w-160 mobile:w-67">
      <div className="w-109 mb-60 mobile:hidden">
        <Image src={logo} alt="logo" />
      </div>
      <div className="hidden tabelt:hidden mobile:block w-24 ">
        <Image src={mobileLogo} alt="mobile logo" />
      </div>
      <div className="flex justify-between">
        <p className="text-12 font-bold text-gray-78 mobile:hidden">Dash Boards</p>
        <Image
          src={add}
          alt="add dash board"
          className="w-20 mobile:mt-39 mobile:mb-22 cursor-pointer"
          onClick={showAddDashboardModal}
        />
      </div>
      <DashboardList />
      {isAddDashboardModalVisible && (
        <AddDashboardModal openModal={isAddDashboardModalVisible} handleModalClose={hideAddDashboardModal} />
      )}
    </div>
  );
};

export default SideBar;
