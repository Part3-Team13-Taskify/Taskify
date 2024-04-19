import Image, { StaticImageData } from 'next/image';
import landing from '@/public/assets/landing/landing1.png';
import landing2 from '@/public/assets/landing/landing2.png';
import landing3 from '@/public/assets/landing/landing3.png';
import landing4 from '@/public/assets/landing/landing4.png';
import landing5 from '@/public/assets/landing/landing5.png';
import landing6 from '@/public/assets/landing/landing6.png';
import Link from 'next/link';

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
      <div className="bg-black-17 w-378 h-124 flex flex-col space-y-18 pt-30 pl-32 rounded-b-8">
        <p className="text-white text-18 font-bold">{title}</p>
        <p className="text-white font-semibold">{text}</p>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <main className="bg-black pt-164 pb-160 mx-auto flex flex-col items-center space-y-90">
      <div className="flex flex-col items-center space-y-48 mobile:space-y-26">
        <div className="w-722 tablet:w-537 mobile:w-287">
          <Image src={landing} alt="taskify" />
        </div>
        <p className="text-white text-76 font-bold text-center tablet:text-56 mobile:text-40">
          새로운 일정 관리
          <span className="text-violet ml-20 ">
            <br className="hidden mobile:block" />
            Taskify
          </span>
        </p>
        <Link
          href="/signin"
          className="text-white w-280 py-14 rounded-8 bg-violet text-center tablet:w-235 tablet:py-12"
        >
          로그인하기
        </Link>
      </div>

      <div className="w-full max-w-1200 h-600 flex justify-between pt-103 pl-60 bg-black-17 rounded-8 tablet:w-664 tablet:h-972 tablet:pt-63 tablet:flex-col mobile:w-343 mobile:h-686 mobile:pl-0">
        <div className="flex flex-col space-y-90 pt-20 mobile:pt-0 mobile:text-center mobile:space-y-61">
          <p className="text-gray-9f text-22 font-semibold ">Point 1</p>
          <p className="text-white text-48 font-bold mobile:text-36">
            일의 우선순위를
            <br /> 관리하세요
          </p>
        </div>
        <div className="w-594 tablet:w-519 mobile:w-296 tablet:ml-84 mobile:ml-46">
          <Image src={landing2} alt="manage task priority" className="rounded-tl-8 " />
        </div>
      </div>

      <div className="w-full max-w-1200 h-600 flex space-x-100 tablet:space-x-0 pt-103 pl-60 tablet:pl-0 bg-black-17 rounded-8 tablet:w-664 tablet:h-972 mobile:w-343 mobile:h-686 tablet:pt-63 tablet:flex-col-reverse tablet:justify-between ">
        <div className="w-436 tablet:w-360 mobile:w-217 tablet:mx-auto">
          <Image src={landing3} alt="set tasks" className="rounded-t-8" />
        </div>
        <div className="flex flex-col space-y-100 pt-25 tablet:pt-0 tablet:pl-60 mobile:pt-0 mobile:text-center mobile:pl-0 mobile:space-y-61">
          <p className="text-gray-9f text-22 font-semibold">Point 2</p>
          <p className="text-white text-48 font-bold mobile:text-36">
            해야 할 일을
            <br /> 등록하세요
          </p>
        </div>
      </div>

      <div className="w-full max-w-1200  flex flex-col space-y-36 rounded-8 tablet:w-378">
        <p className="text-28 text-white font-bold mobile:text-22 mobile:text-center">생산성을 높이는 다양한 설정 ⚡</p>
        <div className="flex space-x-36 tablet:flex-col tablet:space-x-0 tablet:space-y-36">
          <LandingCard image={landing4} title="대시보드 설정" text="대시보드 사진과 이름을 변경할 수 있어요." />
          <LandingCard image={landing5} title="초대" text="새로운 팀원을 초대할 수 있어요." />
          <LandingCard image={landing6} title="구성원" text="구성원을 초대하고 내보낼 수 있어요." />
        </div>
      </div>
    </main>
  );
};

export default Content;
