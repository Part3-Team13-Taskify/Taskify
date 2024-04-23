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
      className="flex flex-col justify-center gap-50 w-540 h-250 mobile:w-327 mobile:220"
      openModal={openModal}
      handleModalClose={handleModalClose}
    >
      <div className="mb-10 text-18 font-medium text-center mobile:text-16">{errorText}</div>
      <Button buttonType="modal2" bgColor="violet" textColor="white" onClick={handleModalClose}>
        확인
      </Button>
    </Modal>
  );
};

export default SignModal;
