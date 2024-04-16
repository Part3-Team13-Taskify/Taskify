import Image, { StaticImageData } from 'next/image';
import landing from '@/public/assets/landing/landing1.png';
import landing2 from '@/public/assets/landing/landing2.png';
import landing3 from '@/public/assets/landing/landing3.png';
import landing4 from '@/public/assets/landing/landing4.png';
import landing5 from '@/public/assets/landing/landing5.png';
import landing6 from '@/public/assets/landing/landing6.png';

interface LandingCardProps {
  image: StaticImageData;
  title: string;
  text: string;
}

const LandingCard = ({ image, title, text }: LandingCardProps) => {
  return (
    <div>
      <div className="bg-black-4b w-378 h-260 rounded-t-8 flex items-center justify-center">
        <Image src={image} alt="manage task priority" width={300} />
      </div>
      <div className="bg-black-17 w-378 h-124 flex flex-col space-y-18 pt-33 pl-32 rounded-b-8">
        <p className="text-white text-18 font-bold">{title}</p>
        <p className="text-white font-semibold">{text}</p>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <main className="bg-black pt-164 pb-160 mx-auto flex flex-col items-center space-y-90">
      <div className="flex flex-col items-center space-y-48">
        <Image src={landing} alt="taskify" width={722} height={423} />
        <p className="text-white text-76 font-bold">
          새로운 일정 관리 <span className="text-violet">Taskify</span>
        </p>
        <button className="text-white">로그인하기</button>
      </div>
      <div className="w-full max-w-1200 h-600 flex justify-between pt-103 pl-60 bg-black-17 rounded-8">
        <div className="flex flex-col space-y-90 pt-20">
          <p className="text-gray-9f text-22 font-semibold">Point 1</p>
          <p className="text-white text-48 font-bold">
            일의 우선순위를
            <br /> 관리하세요
          </p>
        </div>
        <Image
          src={landing2}
          alt="manage task priority"
          width={594}
          height={497}
          className="justify-self-end rounded-t-8"
        />
      </div>
      <div className="w-full max-w-1200 h-600 flex space-x-100 pt-98 pl-108 bg-black-17 rounded-8">
        <Image src={landing3} alt="set tasks" width={436} height={502} className="rounded-t-8" />
        <div className="flex flex-col space-y-100 pt-25">
          <p className="text-gray-9f text-22 font-semibold">Point 2</p>
          <p className="text-white text-48 font-bold">
            해야 할 일을
            <br /> 등록하세요
          </p>
        </div>
      </div>
      <div className="w-full max-w-1200 h-600 flex flex-col space-y-36 rounded-8">
        <p className="text-28 text-white font-bold">생산성을 높이는 다양한 설정 ⚡</p>
        <div className="flex space-x-36">
          <LandingCard image={landing4} title="대시보드 설정" text="대시보드 사진과 이름을 변경할 수 있어요." />
          <LandingCard image={landing5} title="초대" text="새로운 팀원을 초대할 수 있어요." />
          <LandingCard image={landing6} title="구성원" text="구성원을 초대하고 내보낼 수 있어요." />
        </div>
      </div>
    </main>
  );
};

export default Content;
