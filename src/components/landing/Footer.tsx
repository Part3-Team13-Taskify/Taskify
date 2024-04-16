import Image from 'next/image';
import email from '@/public/assets/icon/email.svg';
import facebook from '@/public/assets/icon/facebook.svg';
import instagram from '@/public/assets/icon/instagram.svg';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-9f flex w-full pl-141 pr-141 pt-41 pb-40 mx-auto justify-between tablet:pl-40 tablet:pr-40 mobile:flex-col mobile:items-center mobile:pb-90">
      <p>©codeit - 2024</p>
      <div className="flex space-x-32 mobile:space-x-20 mobile:mt-14 mobile:mb-68">
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className="flex space-x-14 mobile:space-x-24">
        <Link href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
          <Image src={email} alt="email" width={20} />
        </Link>
        <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <Image src={facebook} alt="facebook" width={20} />
        </Link>
        <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <Image src={instagram} alt="instagram" width={20} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
