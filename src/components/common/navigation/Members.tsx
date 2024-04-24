import { useTotalMembersStore } from '@/src/util/zustand';
import Image from 'next/image';
import useWindowSize from '@/src/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getTotalMembers } from '@/src/pages/api/dashboardEditApi';

const Members = () => {
  const { width } = useWindowSize();
  const router = useRouter();
  const { id } = router.query;
  const idNumber = Number(id);
  const totalMembers = useTotalMembersStore((state) => state.totalMembersData);
  const setTotalMembersData = useTotalMembersStore((state) => state.setTotalMembersData);
  const visibleCount = width <= 1199 ? 2 : 4;
  const visibleMembers = totalMembers.slice(0, visibleCount);
  const remainingCount = totalMembers.length - visibleMembers.length;

  useEffect(() => {
    if (!idNumber) return;
    getTotalMembers(idNumber).then((res) => {
      setTotalMembersData(res.members);
    });
  }, [idNumber]);

  return (
    <div className="flex gap-0">
      {visibleMembers.map((member) => (
        <div className="border-2 rounded-99 -ml-8" key={member.id}>
          <Image src={member.profileImageUrl} alt="profile" width={30} height={30} className="rounded-99 " />
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="border-2 z-1 w-35 h-35 bg-pink-bg text-pink rounded-99 -ml-8 flex items-center justify-center">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default Members;
