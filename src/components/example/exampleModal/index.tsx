import useModal from '@/src/hooks/useModal';
import AddColumnModal from '../../ColumnModal/addColumnModal';
import Button from '../../common/button';
import ModalPortal from '../../common/modalPortal';
import EditColumnModal from '../../ColumnModal/editColumnModal';

// 모달창을 띄울 예시 페이지
const ExampleModalPage = () => {
  const {
    openModal: addColumnModal,
    handleModalClose: addColumnModalClose,
    handleModalOpen: addColumnModalOpen,
  } = useModal();

  const {
    openModal: editColumnModal,
    handleModalClose: editColumnModalClose,
    handleModalOpen: editColumnModalOpen,
  } = useModal();

  return (
    <>
      <ModalPortal>
        <AddColumnModal openModal={addColumnModal} handleModalClose={addColumnModalClose} />
      </ModalPortal>
      <Button buttonType="columnAdd" bgColor="white" textColor="black" onClick={addColumnModalOpen}>
        컬럼 추가하기
      </Button>

      <ModalPortal>
        <EditColumnModal openModal={editColumnModal} handleModalClose={editColumnModalClose} />
      </ModalPortal>
      <Button buttonType="columnAdd" bgColor="white" textColor="black" onClick={editColumnModalOpen}>
        컬럼 수정하기
      </Button>
    </>
  );
};

export default ExampleModalPage;
