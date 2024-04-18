import arrow from '@/public/assets/icon/arrow.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';

const DashboardEditContent = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="flex p-20 flex-col bg-gray-fa w-full gap-25 pb-56">
      <Link href={`/dashboard/${id}`} className="flex gap-8">
        <Image src={arrow} alt="go back" width={20} />
        <p className="font-semibold">돌아가기</p>
      </Link>
      <Dashboard />
    </main>
  );
};

export default DashboardEditContent;
