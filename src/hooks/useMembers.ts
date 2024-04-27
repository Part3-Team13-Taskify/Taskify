import { useEffect } from 'react';
import { useMembersStore } from '@/src/util/zustand';
import { getMembers } from '@/src/pages/api/dashboardEditApi';

const useMembers = (idNumber: number) => {
  const offset = useMembersStore((state) => state.offset);
  const setOffset = useMembersStore((state) => state.setOffset);
  const itemsPerPage = 4;
  const setMaxOffset = useMembersStore((state) => state.setMaxOffset);
  const maxOffset = useMembersStore((state) => state.maxOffset);
  const setMembersData = useMembersStore((state) => state.setMembersData);
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

  const handleLoadMembers = (resetOffset?: number) => {
    getMembers(idNumber, resetOffset || offset).then((res) => {
      setMembersData(res.members);
      const maxOffsets = Math.ceil(res.totalCount / itemsPerPage);
      setMaxOffset(maxOffsets);
      if (resetOffset) setOffset(resetOffset);
    });
  };

  useEffect(() => {
    if (!idNumber) return;
    handleLoadMembers();
  }, [idNumber, offset]);

  return {
    offset,
    setOffset,
    itemsPerPage,
    maxOffset,
    handleLoadMembers,
    handleNextPage,
    handlePreviousPage,
  };
};

export default useMembers;
