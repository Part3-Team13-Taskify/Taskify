import arrow from '@/public/assets/icon/arrow.svg';
import Image from 'next/image';

const DashboardEditContent = () => {
  return (
    <div className="flex">
      <Image src={arrow} alt="go back" />
      <p>돌아가기</p>
    </div>
  );
};

export default DashboardEditContent;
