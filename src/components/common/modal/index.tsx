import { ReactNode } from 'react';

interface ModalProps {
  upperChildren: ReactNode;
  lowerChildren: ReactNode;
  openModal: boolean;
  // modalRef: RefObject<HTMLDivElement>;
  handleModalClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ upperChildren, lowerChildren, openModal, handleModalClose }) => {
  const stylesModal =
    'flex flex-col fixed top-1/2 left-1/2 w-548 bg-white rounded-8 zIndex-modal transform -translate-x-1/2 -translate-y-1/2 px-28 py-32 mobile:px-20 mobile:py-28';

  const open = 'block';

  const handleOverlayClick = () => {
    handleModalClose();
  };
  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full bg-black-overlay zIndex" onClick={handleOverlayClick} />
      <div className={`${stylesModal} ${openModal ? open : ''}`}>
        {upperChildren}
        <div className="flex flex-row-reverse gap-12">{lowerChildren}</div>
      </div>
    </>
  );
};

export default Modal;
