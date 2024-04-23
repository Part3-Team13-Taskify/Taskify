import SideBar from '@/src/components/common/sidebar';
import MyPageContent from '@/src/components/mypage';
import Navigation from '@/src/components/common/navigation';

const MyPage = () => {
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Navigation title="계정관리" />
        <MyPageContent />
      </div>
    </div>
  );
};

export default MyPage;
