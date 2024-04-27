import ColumnsList from '@/src/components/dashboard/columnList';
import Navigation from '@/src/components/common/navigation';
import Layout from '@/src/components/common/layout';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/src/pages/_app';

const Dashboard: NextPageWithLayout = () => {
  return <ColumnsList />;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout navChildren={<Navigation />}>{page}</Layout>;
};

export default Dashboard;
