import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Image from 'next/image';
import { getDashboardList } from '@/src/pages/api/dashboardEditApi';
import { useDashboardListStore } from '@/src/util/zustand';
import { useEffect, useState } from 'react';

const Pagination = () => {
  const [offset, setOffset] = useState(1);
  const itemsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);
  const maxOffest = Math.ceil(totalCount / itemsPerPage);

  const setDashboardList = useDashboardListStore((state) => state.setDashboardList);

  const handleNextPage = () => {
    if (offset < maxOffest) {
      setOffset(offset + 1);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 1) {
      setOffset(offset - 1);
    }
  };

  useEffect(() => {
    getDashboardList(offset).then((res) => {
      setDashboardList(res.dashboards);
      setTotalCount(res.totalCount);
    });
  }, [offset]);

  return (
    <div className="mt-20 flex gap-20 justify-center">
      <div
        className={`w-40 h-40 flex justify-center items-center cursor-pointer ${offset === 1 && 'opacity-25 cursor-not-allowed'}`}
        onClick={handlePreviousPage}
      >
        <Image src={arrow} alt="previous" />
      </div>
      <div
        className={`w-40 h-40 flex justify-center items-center cursor-pointer ${offset === maxOffest && 'opacity-25 cursor-not-allowed'}`}
        onClick={handleNextPage}
      >
        <Image src={arrowReverse} alt="next" />
      </div>
    </div>
  );
};

export default Pagination;
