import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useInvitees from '@/src/hooks/useInvitees';

const InviteesPagination = () => {
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);
  const { offset, maxOffset, handleNextPage, handlePreviousPage } = useInvitees(idNumber);

  return (
    <>
      <p className="mobile:text-12">
        {maxOffset || 1} 페이지 중 {offset}
      </p>
      <div className="flex">
        <div
          className={`w-40 h-40 border-1 rounded-4 flex justify-center items-center cursor-pointer ${offset === 1 && 'opacity-25 cursor-not-allowed'}`}
          onClick={handlePreviousPage}
        >
          <Image src={arrow} alt="previous" />
        </div>
        <div
          className={`w-40 h-40 border-1 rounded-4 flex justify-center items-center cursor-pointer ${offset === maxOffset && 'opacity-25 cursor-not-allowed'}`}
          onClick={handleNextPage}
        >
          <Image src={arrowReverse} alt="next" />
        </div>
      </div>
    </>
  );
};

export default InviteesPagination;
