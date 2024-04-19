import Navigation from '@/src/components/common/navigation';
import SideBar from '@/src/components/common/sidebar';
import DashboardEditContent from '@/src/components/dashboardEdit';

const DashboardEdit = () => {
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Navigation name="비브리지" icon member="멤버" user="유저" />
        <DashboardEditContent />
      </div>
    </div>
  );
};

export default DashboardEdit;
