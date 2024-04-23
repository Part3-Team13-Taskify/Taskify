import Link from 'next/link';
import Image from 'next/image';
import crown from '@/public/assets/icon/crown.svg';
import addBox from '@/public/assets/icon/addBox.svg';
import setting from '@/public/assets/icon/setting.svg';
import vector from '@/public/assets/icon/vector.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getDashboard, getMyProfile } from '@/src/pages/api/dashboardEditApi';
import { useDashboardStore } from '@/src/util/zustand';
import MyProfile from './myProfile';
import Members from './Members';

const Navigation = () => {
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const setDashboardData = useDashboardStore((state) => state.setDashboardData);
  const [myProfile, setMyProfile] = useState({ nickname: '', profileImageUrl: '' });
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);

  useEffect(() => {
    if (idNumber) getDashboard(idNumber).then((res) => setDashboardData(res));
    getMyProfile().then((res) => setMyProfile(res));
  }, [idNumber, setDashboardData]);

  const [dropDown, setDropDown] = useState(false);
  const toggle = () => {
    setDropDown(!dropDown);
  };
  return (
    <header className="w-full justify-between h-70 border-b-1 px-34 mobile:px-12 flex gap-32 items-center text-16 tablet:gap-24 mobile:h-60 mobile:gap-12 mobile:text-14">
      <div className=" flex text-black-33 font-medium tablet:hidden mobile:hidden">
        <div className=" flex items-center text-20 font-bold gap-4">
          {dashboardData ? <h2>{dashboardData.title}</h2> : <h2>내 대쉬보드</h2>}
          {dashboardData.createdByMe ? <Image src={crown} alt="crown" /> : ''}
        </div>
      </div>
      <div className="flex tablet:flex-grow tablet:justify-around gap-32 mobile:gap-12">
        {dashboardData.createdByMe && (
          <div className=" flex gap-16 text-gray-78 tablet:gap-12 mobile:gap-6">
            <Link
              href={`/dashboard/${id}/edit`}
              className=" flex gap-8 px-16 py-10 items-center border-1 rounded-lg border-gray-d9 tablet:py-10 tablet:text-14 mobile:px-12 mobile:py-7  mobile:text-14"
            >
              <Image className="mobile:hidden" src={setting} alt="setting" />
              <p>관리</p>
            </Link>
            <div className=" flex flex-row gap-8 px-16 py-10 items-center border-1 rounded-lg border-gray-d9 tablet:py-10 tablet:text-14 mobile:px-12 mobile:py-7  mobile:text-14">
              <Image className="mobile:hidden" src={addBox} alt="addBox" />
              <p>초대하기</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-32 tablet:gap-24 mobile:gap-12">
          <Members />
          <Image src={vector} alt="vector" />
          <div role="none" onClick={toggle} onKeyDown={toggle} className="relative cursor-pointer">
            <MyProfile nickname={myProfile.nickname} src={myProfile.profileImageUrl} />
            {dropDown && (
              <nav className="absolute z-10 w-100 bg-white divide-y divide-gray-d9 rounded-lg shadow  dark:bg-black-4b dark:divide-gray-78 ">
                <ul className="py-2 text-16 text-black-4b dark:text-gray-200">
                  <li>
                    <Link
                      href="/"
                      className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
                    >
                      로그아웃
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-page"
                      className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
                    >
                      내 정보
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-dashboard"
                      className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
                    >
                      내 대시보드
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
