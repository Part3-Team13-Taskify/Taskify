import arrow from '@/public/assets/icon/arrow.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useDashboardListStore } from '@/src/util/zustand';
import Profile from './profile';
import PasswordChange from './passwordchange';

const MyPageContent = () => {
  const selectedDashboard = useDashboardListStore((state) => state.selectedDashboard);

  return (
    <main className="flex p-20 flex-col bg-gray-fa w-full gap-25 pb-56">
      <Link href={selectedDashboard ? `/dashboard/${selectedDashboard.id}` : '/my-dashboard'} className="flex gap-8">
        <Image src={arrow} alt="go back" width={20} />
        <p className="font-semibold">돌아가기</p>
      </Link>
      <Profile />
      <PasswordChange />
    </main>
  );
};

export default MyPageContent;
