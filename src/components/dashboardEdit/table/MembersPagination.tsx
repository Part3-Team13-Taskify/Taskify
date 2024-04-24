import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Image from 'next/image';
import { getMembers } from '@/src/pages/api/dashboardEditApi';
import { useMembersStore } from '@/src/util/zustand';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const MembersPagination = () => {
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);
  const [offset, setOffset] = useState(1);
  const itemsPerPage = 4;
  const [totalCount, setTotalCount] = useState(0);
  const maxOffest = Math.ceil(totalCount / itemsPerPage);

  const setMembersData = useMembersStore((state) => state.setMembersData);

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
    if (!id) return;
    getMembers(idNumber, offset).then((res) => {
      setMembersData(res.members);
      setTotalCount(res.totalCount);
    });
  }, [idNumber, offset]);

  return (
    <>
      <p className="mobile:text-12">
        {maxOffest} 페이지 중 {offset}
      </p>
      <div className="flex">
        <div
          className={`w-40 h-40 border-1 rounded-4 flex justify-center items-center cursor-pointer ${offset === 1 && 'opacity-25 cursor-not-allowed'}`}
          onClick={handlePreviousPage}
        >
          <Image src={arrow} alt="previous" />
        </div>
        <div
          className={`w-40 h-40 border-1 rounded-4 flex justify-center items-center cursor-pointer ${offset === maxOffest && 'opacity-25 cursor-not-allowed'}`}
          onClick={handleNextPage}
        >
          <Image src={arrowReverse} alt="next" />
        </div>
      </div>
    </>
  );
};

export default MembersPagination;
