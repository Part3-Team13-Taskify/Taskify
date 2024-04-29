import deleteTask from '@/src/pages/api/taskModalApi';

import { useIsCardFormatted } from '@/src/util/zustand';
import Button from '../common/button';
import Modal from '../common/modal';

interface ModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

interface DeleteModal extends ModalProps {
  handleCardClose: () => void;
  cardTitle: string;
  cardId: number;
}

const DeleteTask = ({ openModal, handleModalClose, handleCardClose, cardTitle, cardId }: DeleteModal) => {
  if (!openModal) return null;

  const setIsCardFormatted = useIsCardFormatted((state) => state.setIsCardFormatted);

  const handleDeleteClick = () => {
    deleteTask(cardId);
    handleModalClose();
    handleCardClose();
    setIsCardFormatted(true);
  };

  return (
    <Modal openModal={openModal} handleModalClose={handleModalClose}>
      <div className="flex flex-col gap-12 text-center">
        <div className="font-bold text-24">정말 삭제하시겠습니까?</div>
        <div>경고: 해당 카드를 삭제하면 복구할 수 없습니다.</div>
        <div className="w-full border-1 rounded-6 p-8 ">{cardTitle}</div>
        <div className="flex flex-row justify-end gap-8">
          <Button buttonType="modal1" className="border-1" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            buttonType="modal1"
            className="border-1"
            bgColor="violet"
            textColor="white"
            onClick={handleDeleteClick}
          >
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTask;
