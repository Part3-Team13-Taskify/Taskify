import Button from '../../common/button';
import Modal from '../../common/modal';

interface DeleteColumnModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const DeleteColumnModal: React.FC<DeleteColumnModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal
      className=" justify-between w-540 h-250 mobile:w-327"
      openModal={openModal}
      handleModalClose={handleModalClose}
      upperChildren={<span className="flex justify-center mt-50">컬럼의 모든 카드가 삭제됩니다.</span>}
      lowerChildren={
        <>
          <Button buttonType="modal2" bgColor="violet" textColor="white">
            삭제
          </Button>
          <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
            취소
          </Button>
        </>
      }
    />
  );
};

export default DeleteColumnModal;
