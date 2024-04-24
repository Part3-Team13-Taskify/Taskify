import { useMembersStore } from '@/src/util/zustand';
import Image from 'next/image';
import useWindowSize from '@/src/hooks/useWindowSize';

const Members = () => {
  const { width } = useWindowSize();
  const members = useMembersStore((state) => state.membersData);
  const visibleCount = width <= 1199 ? 2 : 4;
  const visibleMembers = members.slice(0, visibleCount);
  const remainingCount = members.length - visibleMembers.length;
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
