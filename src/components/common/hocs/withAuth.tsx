import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/src/pages/_app';
import { useEffect } from 'react';

const withAuth = <P extends {}>(Component: NextPageWithLayout<P>) => {
  const WithAuthComponent: NextPageWithLayout<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        // window 객체를 사용하는 코드
        if (!localStorage.getItem('accessToken')) {
          alert('로그인 후 이용이 가능합니다.');
          router.push('/'); // 메인 렌딩페이지로 이동
        }
      }
    }, []);

    return <Component {...props} />;
  };

  if (Component.getLayout) {
    WithAuthComponent.getLayout = Component.getLayout;
  }

  return WithAuthComponent;
};

export default withAuth;
