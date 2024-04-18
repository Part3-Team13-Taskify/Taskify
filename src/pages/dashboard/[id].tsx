import SideBar from '@/src/components/common/sidebar';
import ColumnsList from '@/src/components/dashboard/ColumnsList';

const Dashboard = () => {
  return (
    <div className="flex bg-gray-fa">
      <SideBar />
      <ColumnsList />
    </div>
  );
};

export default Dashboard;
