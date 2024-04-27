import { useEffect } from 'react';
import { useInviteesStore } from '@/src/util/zustand';
import { getInvitees } from '../pages/api/dashboardEditApi';

const useInvitees = (idNumber: number) => {
  const offset = useInviteesStore((state) => state.offset);
  const setOffset = useInviteesStore((state) => state.setOffset);
  const itemsPerPage = 4;
  const setMaxOffset = useInviteesStore((state) => state.setMaxOffset);
  const maxOffset = useInviteesStore((state) => state.maxOffset);
  const setInviteesData = useInviteesStore((state) => state.setInviteesData);
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

  const handleLoadInvitees = (resetOffset?: number) => {
    getInvitees(idNumber, resetOffset || offset).then((res) => {
      setInviteesData(res?.invitations);
      const maxOffsets = Math.ceil(res?.totalCount / itemsPerPage);
      setMaxOffset(maxOffsets);
      if (resetOffset) setOffset(resetOffset);
    });
  };

  useEffect(() => {
    if (!idNumber) return;
    handleLoadInvitees();
  }, [idNumber, offset]);

  return {
    offset,
    setOffset,
    itemsPerPage,
    maxOffset,
    setInviteesData,
    handleLoadInvitees,
    handleNextPage,
    handlePreviousPage,
  };
};

export default useInvitees;
