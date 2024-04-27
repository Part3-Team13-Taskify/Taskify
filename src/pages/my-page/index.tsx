import MyPageContent from '@/src/components/mypage';
import Navigation from '@/src/components/common/navigation';
import Layout from '@/src/components/common/layout';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/src/pages/_app';
import withAuth from '@/src/components/common/hocs/withAuth';

const MyPage: NextPageWithLayout = () => {
  return <MyPageContent />;
};

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout navChildren={<Navigation title="계정관리" />}>{page}</Layout>;
};

export default withAuth(MyPage);
