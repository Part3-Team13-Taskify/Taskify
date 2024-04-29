import { useMyDashboardListStore } from '@/src/util/zustand';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchDashboardList } from '@/src/pages/api/dashboardEditApi';
import type { Dashboard } from '@/src/util/zustand';
import MyDashboardPagination from '@/src/components/mydashboard/MyDashboardPagination';
import MyDashboardListItem from '@/src/components/mydashboard/MyDashboardListItem';
import Button from '@/src/components/common/button';
import addLarge from '@/public/assets/chip/addLarge.svg';
import AddDashboardModal from '@/src/components/dashboardModal/addDashboardModal';
import useModal from '@/src/hooks/useModal';
import ModalPortal from '@/src/components/common/modalPortal/';
import Image from 'next/image';

const DashboardList = () => {
  const [selectedDashboard, setSelectedDashboard] = useState(0);
  const dashboardList = useMyDashboardListStore((state) => state.myDashboardList);
  const setMyDashboardList = useMyDashboardListStore((state) => state.setMyDashboardList);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const itemsPerPage = 5;
  const maxOffset = Math.ceil(totalCount / itemsPerPage);

  const {
    openModal: addDashboardModal,
    handleModalClose: addDashboardModalClose,
    handleModalOpen: addDashboardModalOpen,
  } = useModal();

  const handleClick = useCallback((dashboardId: number) => {
    setSelectedDashboard(dashboardId);
  }, []);

  const updatePageInfo = useCallback(
    (newOffset: number) => {
      fetchDashboardList(newOffset, itemsPerPage).then((res) => {
        setMyDashboardList(res.dashboards);
        setTotalCount(res.totalCount);
        setOffset(newOffset);
      });
    },
    [itemsPerPage, setMyDashboardList],
  );

  useEffect(() => {
    updatePageInfo(offset);
  }, [offset, updatePageInfo]);

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
  };

  useEffect(() => {
    updatePageInfo(1);
  }, [updatePageInfo]);

  return (
    <div className="flex-col max-w-1022 mobile:w-full">
      <div className="max-w-1022 grid grid-cols-3 gap-12 my-16 tablet:grid-cols-2 tablet:gap-10 mobile:flex mobile:flex-col mobile:gap-8">
        <Button
          className=""
          buttonType="dashboardAdd"
          bgColor="white"
          textColor="black"
          type="button"
          onClick={addDashboardModalOpen}
        >
          새로운 대시보드
          <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
        </Button>
        <ModalPortal>
          <AddDashboardModal openModal={addDashboardModal} handleModalClose={addDashboardModalClose} />
        </ModalPortal>
        {Array.isArray(dashboardList) &&
          dashboardList.map((data: Dashboard) => (
            <MyDashboardListItem
              key={data.id}
              data={data}
              handleClick={handleClick}
              selectedDashboard={selectedDashboard}
            />
          ))}
      </div>
      <div className="flex justify-end items-center gap-18">
        <div>{`${maxOffset} 페이지 중 ${offset}`}</div>
        <MyDashboardPagination offset={offset} setOffset={handlePageChange} />
      </div>
    </div>
  );
};

export default DashboardList;
