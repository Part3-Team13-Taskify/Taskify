import Header from '@/src/components/common/header';
import SideBar from '@/src/components/common/sidebar';
import DashboardEditContent from '@/src/components/dashboardEdit';

const DashboardEdit = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        <DashboardEditContent />
      </div>
    </div>
  );
};

export default DashboardEdit;
