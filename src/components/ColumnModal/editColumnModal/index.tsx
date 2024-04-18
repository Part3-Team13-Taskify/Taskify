import useModal from '@/src/hooks/useModal';
import Button from '../../common/button';
import Modal from '../../common/modal';
import ModalPortal from '../../common/modalPortal';
import DeleteColumnModal from '../deleteColumnModal';

interface EditColumnModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const EditColumnModal: React.FC<EditColumnModalProps> = ({ openModal, handleModalClose }) => {
  const {
    openModal: deleteColumnModal,
    handleModalClose: deleteColumnModalClose,
    handleModalOpen: deleteColumnModalOpen,
  } = useModal();

  if (!openModal) {
    return null;
  }

  return (
    <Modal
      className="w-540 mobile:w-327"
      buttonClassName="justify-between mobile:flex-col-reverse mobile:gap-16"
      openModal={openModal}
      handleModalClose={handleModalClose}
      upperChildren={
        <>
          <div className="mb-32 text-24 font-bold">컬럼 관리</div>
          <form className="flex flex-col">
            <label className="mb-10 text-18 font-medium" htmlFor="columnName">
              이름
            </label>
            <input
              className="w-full h-48 px-16 mb-28 border-1 border-gray-d9 rounded-6 mobile:mb-24"
              type="text"
              placeholder="선택한 컬럼 이름"
            />
          </form>
        </>
      }
      lowerChildren={
        <>
          <div className="flex flex-row-reverse gap-12 mobile:gap-11 ">
            <Button buttonType="modal2" bgColor="violet" textColor="white">
              변경
            </Button>
            <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
              취소
            </Button>
          </div>

          <div className="flex flex-col-reverse mobile:flex-row">
            <ModalPortal>
              <DeleteColumnModal openModal={deleteColumnModal} handleModalClose={deleteColumnModalClose} />
            </ModalPortal>
            <span className="text-14 text-gray-78 underline cursor-pointer" onClick={deleteColumnModalOpen}>
              삭제하기
            </span>
          </div>
        </>
      }
    />
  );
};

export default EditColumnModal;
