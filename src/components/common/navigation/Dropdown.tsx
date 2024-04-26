import Link from 'next/link';
import { useRef, useEffect } from 'react';

const Dropdown = ({ setDropDown }: { setDropDown: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <nav
      ref={dropDownRef}
      className="absolute top-50 left-33 mobile:-left-29 mobile:top-45 w-100 bg-white divide-y divide-gray-d9 rounded-lg shadow  dark:bg-black-4b dark:divide-gray-78 "
    >
      <ul className="py-2 text-16 text-black-4b dark:text-gray-200">
        <li>
          <Link href="/" className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white">
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
  );
};

export default Dropdown;
