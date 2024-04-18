import SideBar from '@/src/components/common/sidebar';
import InvitationDashboard from '@/src/components/mydashboard/InvitationDashboard';

const MyDashboard = () => {
  return (
    <div className="flex bg-gray-fa">
      <SideBar />
      <InvitationDashboard />
    </div>
  );
};

export default MyDashboard;
