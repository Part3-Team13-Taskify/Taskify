import Link from 'next/link';
import Image from 'next/image';
import crown from '@/public/assets/icon/crown.svg';
import addBox from '@/public/assets/icon/addBox.svg';
import setting from '@/public/assets/icon/setting.svg';
import vector from '@/public/assets/icon/vector.svg';

interface NavProps {
  name: string;
  icon: boolean;
  member: any;
  user: any;
}
const Navigation = ({ name, icon, member, user }: NavProps) => {
  return (
    <header className="w-1920 h-70 pl-340 flex flex-row items-center gap-32 font-sans text-16">
      <div className="w-4/5 flex flex-row justify-between text-black-33 font-medium ">
        {/* 대시보드이름(따로 이름 없다면 내 대쉬보드) + crown icon이 있으면 적용 */}
        <div className=" flex flex-row items-center text-20 font-bold gap-4">
          {name ? <h2>{name}</h2> : <h2>내 대쉬보드</h2>}
          {icon ? <Image src={crown} alt="crown" /> : ''}
        </div>
        <div className=" flex flex-row items-center gap-40">
          {icon ? (
            <div className=" flex flex-row gap-16 text-gray-78">
              <div className=" flex flex-row gap-8 px-16 py-10 items-center border-1 rounded-lg border-gray-d9 ">
                <Image src={setting} alt="setting" />
                <p>관리</p>
              </div>
              <div className=" flex flex-row gap-8 px-16 py-10 items-center border-1 rounded-lg border-gray-d9">
                <Image src={addBox} alt="addBox" />
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
        {user}
        <nav className="">
          {/* 드롭다운 */}
          <Link href="/">로그아웃</Link> {/* 메인페이지로 이동 */}
          <Link href="/mypage">내 정보</Link> {/* 추후 만들 mypage로 이동 */}
          <Link href="/mydashboard">내 대시보드</Link> {/* 추후 만들 mydashboard로 이동 */}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
