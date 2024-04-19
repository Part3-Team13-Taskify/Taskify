import SideBar from '@/src/components/common/sidebar';
import InvitationDashboard from '@/src/components/mydashboard/InvitationDashboard';
import Navigation from '@/src/components/common/navigation';

const MyDashboard = () => {
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Navigation name="내 대시보드" icon={false} member="멤버" user="유저" />
        <div className="bg-gray-fa">
          <InvitationDashboard />
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
