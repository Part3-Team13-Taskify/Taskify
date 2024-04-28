import InvitationDashboard from '@/src/components/mydashboard/InvitationDashboard';
import Navigation from '@/src/components/common/navigation';
import Layout from '@/src/components/common/layout';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/src/pages/_app';
import withAuth from '@/src/components/common/hocs/withAuth';

const MyDashboard: NextPageWithLayout = () => {
  return <InvitationDashboard />;
};

MyDashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout navChildren={<Navigation title="내 대시보드" />}>{page}</Layout>;
};

export default withAuth(MyDashboard);
