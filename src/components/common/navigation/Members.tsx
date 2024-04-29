import { useTotalMembersStore, useMembersStore } from '@/src/util/zustand';
import useWindowSize from '@/src/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getTotalMembers } from '@/src/pages/api/dashboardEditApi';
import InitialImage from './InitialImage';

const Members = () => {
  const { width } = useWindowSize();
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);
  const totalMembers = useTotalMembersStore((state) => state.totalMembersData);
  const setTotalMembersData = useTotalMembersStore((state) => state.setTotalMembersData);
  const visibleCount = width <= 1199 ? 2 : 4;
  const visibleMembers = totalMembers?.slice(0, visibleCount);
  const remainingCount = Number(totalMembers?.length) - Number(visibleMembers?.length);
  const members = useMembersStore((state) => state.membersData);

  useEffect(() => {
    if (!idNumber) return;
    getTotalMembers(idNumber).then((res) => {
      setTotalMembersData(res?.members);
    });
  }, [idNumber, members]);

  return (
    <div className="flex">
      {totalMembers.length > 1 &&
        visibleMembers?.map((member) => (
          <div key={member.id}>
            {member.profileImageUrl ? (
              <div className="overflow-hidden w-30 h-30 rounded-99 -ml-8">
                <img src={member.profileImageUrl} alt="profile" className="border-2 rounded-99 w-30 h-30 " />
              </div>
            ) : (
              <InitialImage nickname={member.nickname} className="-ml-8" />
            )}
          </div>
        ))}
      {remainingCount > 0 && (
        <div className="border-2 z-1 w-30 h-30 bg-pink-bg text-pink rounded-99 -ml-8 flex items-center justify-center">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default Members;
