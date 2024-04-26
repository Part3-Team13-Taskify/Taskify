// import { useRouter } from 'next/router';
import { useDashboardListStore } from '@/src/util/zustand';
import React, { useEffect, useState } from 'react';
import { getDashboardList } from '@/src/pages/api/dashboardEditApi';
import type { Dashboard } from '@/src/util/zustand';
import DashboardListPagination from './DashboardListPagination';
import DashboardListItem from './DashboardListItem';

const DashboardList = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const [selectedDashboard, setSelectedDashboard] = useState(0);
  const dashboardList = useDashboardListStore((state) => state.dashboardList);
  const setDashboardList = useDashboardListStore((state) => state.setDashboardList);
  const handleClick = (dashboardId: number) => {
    setSelectedDashboard(dashboardId);
  };

  useEffect(() => {
    getDashboardList().then((res) => {
      setDashboardList([...res.dashboards]);
    });
  }, []);

  return (
    <div className="w-full h-45 flex my-16 flex-col mobile:gap-30 mobile:translate-x-4">
      {Array.isArray(dashboardList) &&
        dashboardList.map((data: Dashboard) => (
          <DashboardListItem
            key={data.id}
            data={data}
            handleClick={handleClick}
            selectedDashboard={selectedDashboard}
          />
        ))}
      <DashboardListPagination />
    </div>
  );
};

export default DashboardList;
