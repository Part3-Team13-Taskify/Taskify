import arrow from '@/public/assets/icon/arrow.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import add from '@/public/assets/icon/addViolet.svg';
import DashboardCard from '../dashboardEdit/DashboardCard';
import Button from '../common/button';

const MyPageContent = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="flex p-20 flex-col bg-gray-fa w-full gap-25 pb-56">
      <Link href={`/dashboard/${id}`} className="flex gap-8">
        <Image src={arrow} alt="go back" width={20} />
        <p className="font-semibold">돌아가기</p>
      </Link>
      <DashboardCard>
        <p className="font-bold text-20">프로필</p>
        <div className="flex">
          <div className="w-182 h-182 bg-gray-fa flex items-center justify-center rounded-6">
            <Image src={add} alt="add profile image" />
          </div>
          {/* <Input />
          <Input /> */}
        </div>
        <div className="flex justify-end">
          <Button buttonType="decision" bgColor="violet" textColor="white">
            저장
          </Button>
        </div>
      </DashboardCard>
      <DashboardCard>
        <p className="font-bold text-20">비밀번호 변경</p>
        <div className="flex">
          {/* <Input />
          <Input />
          <Input /> */}
        </div>
        <div className="flex justify-end">
          <Button buttonType="decision" bgColor="violet" textColor="white">
            변경
          </Button>
        </div>
      </DashboardCard>
    </main>
  );
};

export default MyPageContent;
