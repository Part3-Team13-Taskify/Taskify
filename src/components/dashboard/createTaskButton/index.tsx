import Image from 'next/image';
import useModal from '@/src/hooks/useModal';
import addLarge from '@/public/assets/chip/addLarge.svg';
import CreateTask from '../../TaskModal/CreateTask';
import Button from '../../common/button';
import ModalPortal from '../../common/modalPortal';

type CreateTasks = {
  dashboardId: number;
  columnId: number;
};

const CreateTaskButton = ({ dashboardId, columnId }: CreateTasks) => {
  const {
    openModal: createTaskModal,
    handleModalClose: createTaskModalClose,
    handleModalOpen: createTaskModalOpen,
  } = useModal();

  return (
    <div>
      <ModalPortal>
        <CreateTask
          openModal={createTaskModal}
          handleModalClose={createTaskModalClose}
          dashboardId={dashboardId}
          columnId={columnId}
        />
      </ModalPortal>
      <Button
        className="tablet:w-full mobile:w-full"
        buttonType="add"
        bgColor="white"
        textColor="black"
        type="button"
        onClick={createTaskModalOpen}
      >
        <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
      </Button>
    </div>
  );
};

export default CreateTaskButton;
