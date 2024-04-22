import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  children: ReactNode;
  openModal: boolean;
  handleModalClose: () => void;
  className?: string;
  buttonClassName?: string;
}

const Modal: React.FC<ModalProps> = ({ children, openModal, handleModalClose, className }) => {
  const modalClass = twMerge(
    'flex flex-col fixed top-1/2 left-1/2  bg-white rounded-8 zIndex-modal transform -translate-x-1/2 -translate-y-1/2 px-28 py-32  mobile:px-20 mobile:py-28',
    className,
  );

  const open = 'block';

  const handleOverlayClick = () => {
    handleModalClose();
  };
  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full bg-black-overlay zIndex" onClick={handleOverlayClick} />
      <div className={`${modalClass} ${openModal ? open : ''}`}>{children}</div>
    </>
  );
};

export default Modal;
