import Navigation from '@/src/components/common/navigation';
import DashboardEditContent from '@/src/components/dashboardEdit';
import Layout from '@/src/components/common/layout';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/src/pages/_app';

const DashboardEdit: NextPageWithLayout = () => {
  return (
    <>
      <Navigation name="비브리지" icon member="멤버" user="유저" />
      <DashboardEditContent />
    </>
  );
};

DashboardEdit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DashboardEdit;
