import SideBar from '@/src/components/common/sidebar';
import ColumnsList from '@/src/components/dashboard/ColumnsList';
import Navigation from '@/src/components/common/navigation';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-[300px,minmax(auto,1fr)] grid-rows-[60px,1fr] tablet:grid-rows-[70px,1fr] tablet:grid-cols-[160px,minmax(auto,1fr)] mobile:grid-cols-[67px,minmax(auto,1fr)]">
      <div className="row-span-1">
        <SideBar />
      </div>
      <div className="col-span-1 row-span-1 tablet:col-span-1 tablet:row-span-1 pc:col-span-2">
        <div className="grid grid-rows-1">
          <div className="row-span-1">
            <Navigation />
          </div>
          <div className="row-span-1 overflow-x-auto">
            <ColumnsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
