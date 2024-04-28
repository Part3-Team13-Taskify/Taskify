import { useEffect } from 'react';
import { useDashboardListStore } from '@/src/util/zustand';
import type { SelectedDashboard } from '@/src/util/zustand';
import { getDashboardList } from '../pages/api/dashboardEditApi';

const useDashboardList = () => {
  const offset = useDashboardListStore((state) => state.offset);
  const setOffset = useDashboardListStore((state) => state.setOffset);
  const itemsPerPage = 10;
  const setMaxOffset = useDashboardListStore((state) => state.setMaxOffset);
  const maxOffset = useDashboardListStore((state) => state.maxOffset);
  const setDashboardListData = useDashboardListStore((state) => state.setDashboardListData);
  const selectedDashboard = useDashboardListStore((state) => state.selectedDashboard);
  const setSelectedDashboard = useDashboardListStore((state) => state.setSelectedDashboard);
  const handleClickDashboard = (dashboard: SelectedDashboard) => {
    setSelectedDashboard(dashboard);
  };
  const handleNextPage = () => {
    if (offset < maxOffset) {
      setOffset(offset + 1);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 1) {
      setOffset(offset - 1);
    }
  };

  const handleLoadDashboardList = (resetOffset?: number) => {
    getDashboardList(resetOffset || offset).then((res) => {
      setDashboardListData(res?.dashboards);
      const maxOffsets = Math.ceil(res.totalCount / itemsPerPage);
      setMaxOffset(maxOffsets);
      if (resetOffset) setOffset(resetOffset);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      handleLoadDashboardList();
    }
  }, [offset]);

  return {
    offset,
    setOffset,
    itemsPerPage,
    maxOffset,
    setDashboardListData,
    handleLoadDashboardList,
    handleNextPage,
    handlePreviousPage,
    selectedDashboard,
    handleClickDashboard,
    setSelectedDashboard,
  };
};

export default useDashboardList;
