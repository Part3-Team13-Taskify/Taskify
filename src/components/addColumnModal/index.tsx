import Button from '../common/button';
import Modal from '../common/modal';

interface AddColumnModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal
      openModal={openModal}
      handleModalClose={handleModalClose}
      upperChildren={
        <>
          <div className="mb-32">새 컬럼 생성</div>
          <form className="flex flex-col">
            <label className="mb-10 text-18 font-medium" htmlFor="columnName">
              이름
            </label>
            <input
              className="w-full h-48 px-16 mb-28 border-1 border-gray-d9 rounded-6"
              type="text"
              placeholder="새로운 프로젝트"
            />
          </form>
        </>
      }
      lowerChildren={
        <>
          <Button buttonType="modal2" bgColor="violet" textColor="white">
            생성
          </Button>
          <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
            취소
          </Button>
        </>
      }
    />
  );
};

export default AddColumnModal;
