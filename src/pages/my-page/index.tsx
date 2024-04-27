import MyPageContent from '@/src/components/mypage';
import Navigation from '@/src/components/common/navigation';
import Layout from '@/src/components/common/layout';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/src/pages/_app';

const MyPage: NextPageWithLayout = () => {
  return <MyPageContent />;
};

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout navChildren={<Navigation title="계정관리" />}>{page}</Layout>;
};

export default MyPage;
