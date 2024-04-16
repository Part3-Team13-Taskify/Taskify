import whiteHeaderLogo from '@/public/assets/logo/whiteHeaderLogo.svg';
import whiteHeaderLogoMobile from '@/public/assets/logo/whiteHeaderMobileLogo.svg';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex justify-between  p-16 mobile:px-24 bg-black">
      <div>
        <Link href="/" className="block mobile:hidden">
          <Image src={whiteHeaderLogo} alt="홈 연결 로고" />
        </Link>
        <Link href="/" className="hidden mobile:block">
          <Image src={whiteHeaderLogoMobile} alt="홈 연결 로고" />
        </Link>
      </div>
      <nav className=" flex items-center gap-36 mobile:gap-20 mobile:text-14">
        <Link href="/login" className="text-white">
          로그인
        </Link>
        <Link href="/signup" className="text-white">
          회원가입
        </Link>
      </nav>
    </header>
  );
};

export default Header;
