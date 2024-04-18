import SideBar from '@/src/components/common/sidebar';
import Header from '@/src/components/common/header';
import MyPageContent from '@/src/components/mypage';

const MyPage = () => {
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Header />
        <MyPageContent />
      </div>
    </div>
  );
};

export default MyPage;
