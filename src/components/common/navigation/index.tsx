import Link from 'next/link';
import Image from 'next/image';
import crown from '@/public/assets/icon/crown.svg';
import addBox from '@/public/assets/icon/addBox.svg';
import setting from '@/public/assets/icon/setting.svg';
import vector from '@/public/assets/icon/vector.svg';
import { useState } from 'react';
import instance from '@/src/util/axios';
import { useRouter } from 'next/router';

interface NavProps {
  name: string;
  icon: boolean;
  member: any;
  user: any;
}
const Navigation = ({ name, icon, member, user }: NavProps) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({ title: '', color: '', createdByMe: false });
  const router = useRouter();
  const { id } = router.query;
  const getDashboard = async () => {
    const response = await instance.get(`/dashboards/${id}`);
  };

  const [dropDown, setDropDown] = useState(false);
  const toggle = () => {
    setDropDown(!dropDown);
  };
  return (
    <header className="w-1920 h-70 border-b-1 pl-34 flex flex-row  gap-32 font-sans items-center text-16 tablet:w-744 tablet:gap-24 tablet:pl-228 mobile:w-350 mobile:h-60 mobile:gap-12 mobile:pl-79 mobile:text-14">
      <div className="w-4/5 flex flex-row justify-between text-black-33 font-medium tablet:w-fit mobile:w-fit">
        {/* 대시보드이름(따로 이름 없다면 내 대쉬보드) + crown icon이 있으면 적용 */}
        <div className=" flex flex-row items-center text-20 font-bold gap-4 tablet:hidden mobile:hidden">
          {name ? <h2>{name}</h2> : <h2>내 대쉬보드</h2>}
          {icon ? <Image src={crown} alt="crown" /> : ''}
        </div>
        <div className=" flex flex-row items-center gap-40 tablet:gap-32 mobile:gap-16">
          {icon ? (
            <div className=" flex flex-row gap-16 text-gray-78 tablet:gap-12 mobile:gap-6">
              <div className=" flex flex-row gap-8 px-16 py-10 items-center border-1 rounded-lg border-gray-d9 tablet:py-10 tablet:text-14 mobile:px-12 mobile:py-7  mobile:text-14">
                <Image className="mobile:hidden" src={setting} alt="setting" />
                <p>관리</p>
              </div>
              <div className=" flex flex-row gap-8 px-16 py-10 items-center border-1 rounded-lg border-gray-d9 tablet:py-10 tablet:text-14 mobile:px-12 mobile:py-7  mobile:text-14">
                <Image className="mobile:hidden" src={addBox} alt="addBox" />
                <p>초대하기</p>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* 초대받은사람들 프로필 */}
          <div>{member}</div>
        </div>
      </div>
      <div>
        <Image src={vector} alt="vector" />
      </div>
      <div>
        {/* 사용자 프로필(사진+이름) */}
        <div role="none" onClick={toggle} onKeyDown={toggle} className="relative">
          {user}
        </div>

        {dropDown ? (
          <nav className=" absolute z-10 bg-white divide-y divide-gray-d9 rounded-lg shadow  dark:bg-black-4b dark:divide-gray-78 ">
            <ul className="py-2 text-16 text-black-4b dark:text-gray-200">
              {/* 드롭다운 */}
              <li>
                <Link
                  href="/"
                  className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
                >
                  로그아웃
                </Link>
                {/* 메인페이지로 이동 */}
              </li>
              <li>
                <Link
                  href="/mypage"
                  className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
                >
                  내 정보
                </Link>
                {/* 추후 만들 mypage로 이동 */}
              </li>
              <li>
                <Link
                  href="/mydashboard"
                  className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
                >
                  내 대시보드
                </Link>
                {/* 추후 만들 mydashboard로 이동 */}
              </li>
            </ul>
          </nav>
        ) : (
          ' '
        )}
      </div>
    </header>
  );
};

export default Navigation;
