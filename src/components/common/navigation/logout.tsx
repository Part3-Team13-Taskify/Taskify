import React from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 로컬 스토리지에서 액세스 토큰 삭제
    window.localStorage.removeItem('accessToken');
    // 사용자를 로그인 페이지로 리디렉션
    router.push('/'); // 로그인 페이지 경로에 맞게 변경
  };

  return (
    <button onClick={handleLogout} className="block px-10 py-2 w-full h-full text-left">
      로그아웃
    </button>
  );
};

export default Logout;
