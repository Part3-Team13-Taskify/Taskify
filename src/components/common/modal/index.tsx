import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  upperChildren: ReactNode;
  lowerChildren: ReactNode;
  openModal: boolean;
  handleModalClose: () => void;
  className?: string;
  buttonClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  upperChildren,
  lowerChildren,
  openModal,
  handleModalClose,
  className,
  buttonClassName,
}) => {
  const modalClass = twMerge(
    'flex flex-col fixed top-1/2 left-1/2  bg-white rounded-8 zIndex-modal transform -translate-x-1/2 -translate-y-1/2 px-28 py-32  mobile:px-20 mobile:py-28',
    className,
  );

  const buttonClass = twMerge('flex flex-row-reverse gap-12', buttonClassName);

  const open = 'block';

  const handleOverlayClick = () => {
    handleModalClose();
  };
  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full bg-black-overlay zIndex" onClick={handleOverlayClick} />
      <div className={`${modalClass} ${openModal ? open : ''}`}>
        {upperChildren}
        <div className={`${buttonClass}`}>{lowerChildren}</div>
      </div>
    </>
  );
};

export default Modal;
