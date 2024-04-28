import Image from 'next/image';
import useModal from '@/src/hooks/useModal';
import addLarge from '@/public/assets/chip/addLarge.svg';
import Button from '../../common/button';
import ModalPortal from '../../common/modalPortal';
import AddColumnModal from '../../ColumnModal/addColumnModal';

type Columns = {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface AddColumnButtonProps {
  dashboardId: number;
  setColumnsList: React.Dispatch<React.SetStateAction<Columns[]>>;
  columnsList: Columns[];
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ dashboardId, setColumnsList, columnsList }) => {
  const {
    openModal: addColumnModal,
    handleModalClose: addColumnModalClose,
    handleModalOpen: addColumnModalOpen,
  } = useModal();
  return (
    <div className="fixed right-40 bottom-40">
      <ModalPortal>
        <AddColumnModal
          openModal={addColumnModal}
          handleModalClose={addColumnModalClose}
          dashboardId={dashboardId}
          setColumnsList={setColumnsList}
          columnsList={columnsList}
        />
      </ModalPortal>

      <Button
        className="hover:bg-violet-dark"
        buttonType="columnAdd"
        bgColor="violet"
        textColor="white"
        type="button"
        onClick={addColumnModalOpen}
      >
        <div className="flex items-center gap-12 tablet:hidden">새로운 컬럼추가</div>
        <Image src={addLarge} alt="addBox" className="w-25 h-25 p-3 rounded bg-white" />
      </Button>
    </div>
  );
};

export default AddColumnButton;
