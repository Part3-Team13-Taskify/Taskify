import SideBar from '@/src/components/common/sidebar';
import ColumnsList from '@/src/components/dashboard/ColumnsList';
import Navigation from '@/src/components/common/navigation';

const Dashboard = () => {
  return (
    <div className="flex ">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Navigation name="비브리지" icon member="멤버" user="유저" />
        <ColumnsList />
      </div>
    </div>
    //    <div className="flex w-screen">
    //    <SideBar />
    //    <div className="flex flex-col flex-grow">
    //      <Navigation name="비브리지" icon member="멤버" user="유저" />
    //      <DashboardEditContent />
    //    </div>
    //  </div>
  );
};

export default Dashboard;
