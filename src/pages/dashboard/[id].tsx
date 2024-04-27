import ColumnsList from '@/src/components/dashboard/columnList';
import Navigation from '@/src/components/common/navigation';
import Layout from '@/src/components/common/layout';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/src/pages/_app';
import withAuth from '@/src/components/common/hocs/withAuth';

const Dashboard: NextPageWithLayout = () => {
  return <ColumnsList />;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout navChildren={<Navigation />}>{page}</Layout>;
};

export default withAuth(Dashboard);
