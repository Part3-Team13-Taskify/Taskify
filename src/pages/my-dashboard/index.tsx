import SideBar from '@/src/components/common/sidebar';
import InvitationDashboard from '@/src/components/mydashboard/InvitationDashboard';
import Navigation from '@/src/components/common/navigation';

const MyDashboard = () => {
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Navigation title="내 대시보드" />
        <div className="h-full bg-gray-fa">
          <InvitationDashboard />
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
