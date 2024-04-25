import useModal from '@/src/hooks/useModal';
import EditTask from './EditTask';
import ModalPortal from '../common/modalPortal';

const EditTaskButton = () => {
  const {
    openModal: editTaskModal,
    handleModalClose: editTaskModalClose,
    handleModalOpen: editTaskModalOpen,
  } = useModal();

  return (
    <div>
      <ModalPortal>
        <EditTask openModal={editTaskModal} handleModalClose={editTaskModalClose} />
      </ModalPortal>
      <button className="px-16 py-4 rounded-6 hover:text-violet hover:bg-violet-8%" onClick={editTaskModalOpen}>
        수정
      </button>
    </div>
  );
};

export default EditTaskButton;
