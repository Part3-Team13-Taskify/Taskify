import Button from '../button';
import Modal from '../modal';

interface SignModalProps {
  errorText: string;
  openModal: boolean;
  handleModalClose: () => void;
}

const SignModal: React.FC<SignModalProps> = ({ errorText, openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }
  return (
    <Modal
      className="flex w-540 h-250 mobile:w-327 mobile:h-220"
      openModal={openModal}
      handleModalClose={handleModalClose}
    >
      <div className="flex flex-col justify-center w-full h-full mt-20">
        <div className="text-18 font-medium text-center mobile:text-16">{errorText}</div>
      </div>
      <div className="flex justify-end">
        <Button buttonType="modal2" bgColor="violet" textColor="white" onClick={handleModalClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default SignModal;
