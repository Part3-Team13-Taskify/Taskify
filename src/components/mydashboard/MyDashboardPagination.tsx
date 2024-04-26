import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Image from 'next/image';
import { fetchDashboardList } from '@/src/pages/api/dashboardEditApi';
import { useMyDashboardListStore } from '@/src/util/zustand';
import { useEffect, useState } from 'react';

type Props = {
  offset: number;
  setOffset: (newOffset: number) => void;
};

const MyDashboardPagination: React.FC<Props> = ({ offset, setOffset }) => {
  const itemsPerPage = 5;
  const [totalCount, setTotalCount] = useState(0);
  const maxOffest = Math.ceil(totalCount / itemsPerPage);

  const setMyDashboardList = useMyDashboardListStore((state) => state.setMyDashboardList);

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
    fetchDashboardList(offset, itemsPerPage).then((res) => {
      setMyDashboardList(res.dashboards);
      setTotalCount(res.totalCount);
    });
  }, [offset, itemsPerPage, setMyDashboardList]);

  return (
    <div className="flex justify-center">
      <div
        className={`w-40 h-40 flex justify-center items-center cursor-pointer rounded-l bg-white border border-gray-d9 ${offset === 1 && 'opacity-25 cursor-not-allowed'}`}
        onClick={handlePreviousPage}
      >
        <Image src={arrow} alt="previous" />
      </div>
      <div
        className={`w-40 h-40 flex justify-center items-center cursor-pointer rounded-r bg-white border border-gray-d9 ${offset === maxOffest && 'opacity-25 cursor-not-allowed'}`}
        onClick={handleNextPage}
      >
        <Image src={arrowReverse} alt="next" />
      </div>
    </div>
  );
};

export default MyDashboardPagination;
