import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Image from 'next/image';
import useDashboardList from '@/src/hooks/useDashboardList';

const DashboardListPagination = () => {
  const { offset, maxOffset, handleNextPage, handlePreviousPage } = useDashboardList();

  return (
    <div className="mt-20 flex gap-20 justify-center">
      <div
        className={`w-40 h-40 flex justify-center items-center cursor-pointer ${offset === 1 && 'opacity-25 cursor-not-allowed'}`}
        onClick={handlePreviousPage}
      >
        <Image src={arrow} alt="previous" />
      </div>
      <div
        className={`w-40 h-40 flex justify-center items-center cursor-pointer ${offset === maxOffset && 'opacity-25 cursor-not-allowed'}`}
        onClick={handleNextPage}
      >
        <Image src={arrowReverse} alt="next" />
      </div>
    </div>
  );
};

export default DashboardListPagination;
