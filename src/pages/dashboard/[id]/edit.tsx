import Header from '@/src/components/common/header';
import SideBar from '@/src/components/common/sidebar';
import DashboardEditContent from '@/src/components/dashboardEdit';

const DashboardEdit = () => {
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Header />
        <DashboardEditContent />
      </div>
    </div>
  );
};

export default DashboardEdit;
