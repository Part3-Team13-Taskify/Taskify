import Image from 'next/image';
import logo from '@/public/assets/logo/violetHeaderLogo.svg';
import add from '@/public/assets/icon/addBox.svg';
import mobileLogo from '@/public/assets/logo/violetHeaderMobileLogo.svg';
import green from '@/public/assets/chip/ellipseGreenLarge.svg';
import blue from '@/public/assets/chip/ellipseBlueLarge.svg';
import pink from '@/public/assets/chip/ellipsePinkLarge.svg';
import purple from '@/public/assets/chip/ellipsePurpleLarge.svg';
import yellow from '@/public/assets/chip/ellipseYellowLarge.svg';
import crown from '@/public/assets/icon/crown.svg';
import Link from 'next/link';
import { useState } from 'react';

const MOCK_DATA = [
  {
    id: 0,
    title: '수박바',
    color: green,
    createdAt: '2024-04-16T07:59:49.721Z',
    updatedAt: '2024-04-16T07:59:49.721Z',
    createdByMe: true,
    userId: 0,
  },
  {
    id: 1,
    title: '죠스바',
    color: blue,
    createdAt: '2024-04-16T07:59:49.721Z',
    updatedAt: '2024-04-16T07:59:49.721Z',
    createdByMe: false,
    userId: 0,
  },
  {
    id: 2,
    title: '스크류바',
    color: pink,
    createdAt: '2024-04-16T07:59:49.721Z',
    updatedAt: '2024-04-16T07:59:49.721Z',
    createdByMe: true,
    userId: 0,
  },
  {
    id: 3,
    title: '마이구미',
    color: purple,
    createdAt: '2024-04-16T07:59:49.721Z',
    updatedAt: '2024-04-16T07:59:49.721Z',
    createdByMe: false,
    userId: 0,
  },
  {
    id: 4,
    title: '차돌강된장',
    color: yellow,
    createdAt: '2024-04-16T07:59:49.721Z',
    updatedAt: '2024-04-16T07:59:49.721Z',
    createdByMe: true,
    userId: 0,
  },
];

const Dashboard = () => {
  const [selected, setSelected] = useState(0);

  const handleClick = (id: number) => {
    setSelected(id);
  };

  return (
    <div className="w-full h-45 flex my-16 flex-col mobile:gap-30 mobile:translate-x-4">
      {MOCK_DATA.map((data) => (
        // <Link href={`/dashboard/${data.id}`} key={data.id}>
        <div key={data.id} className="flex my-6 rounded-4" onClick={() => handleClick(data.id)}>
          <Image src={data.color} alt={data.color} width={8} height={8} />
          <p
            className={`text-18 ml-16 mr-6 tablet:text-16 tablet:ml-10 tablet:mr-4 mobile:hidden ${
              data.id === selected && ' text-violet'
            }`}
          >
            {data.title}
          </p>
          {data.createdByMe && <Image src={crown} alt="crown" width={18} className="-translate-y-1 mobile:hidden" />}
        </div>
        // </Link>
      ))}
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 z-40 w-300 h-screen border-1 border-gray-78 bg-white pt-20 px-24 tablet:w-160 mobile:w-67">
      <div className="w-109 mb-60 mobile:hidden">
        <Image src={logo} alt="logo" />
      </div>
      <div className="hidden tabelt:hidden mobile:block w-24 ">
        <Image src={mobileLogo} alt="mobile logo" />
      </div>
      <div className="flex justify-between">
        <p className="text-12 font-bold text-gray-78 mobile:hidden">Dash Boards</p>
        {/* <div className="w-20 mobile:mt-39 mobile:mb-22" onClick={handleOpenModal}> 대시보드 생성하기 모달 핸들러 추가*/}
        <div className="w-20 mobile:mt-39 mobile:mb-22">
          <Image src={add} alt="add dash board" />
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default SideBar;
