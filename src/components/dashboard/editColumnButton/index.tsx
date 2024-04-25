import Image from 'next/image';
import useModal from '@/src/hooks/useModal';
import setting from '@/public/assets/icon/setting.svg';
import ModalPortal from '../../common/modalPortal';
import EditColumnModal from '../../columnModal/editColumnModal';

type Columns = {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface EditColumnButtonProps {
  dashboardId: number;
  columnsTitle: string;
  columnId: number;
  setColumnsList: React.Dispatch<React.SetStateAction<Columns[]>>;
  columnsList: Columns[];
}

const EditColumnButton: React.FC<EditColumnButtonProps> = ({
  dashboardId,
  columnsTitle,
  columnId,
  setColumnsList,
  columnsList,
}) => {
  const {
    openModal: editColumnModal,
    handleModalClose: editColumnModalClose,
    handleModalOpen: editColumnModalOpen,
  } = useModal();

  return (
    <>
      <ModalPortal>
        <EditColumnModal
          openModal={editColumnModal}
          handleModalClose={editColumnModalClose}
          dashboardId={dashboardId}
          columnsTitle={columnsTitle}
          columnId={columnId}
          setColumnsList={setColumnsList}
          columnsList={columnsList}
        />
      </ModalPortal>

      <Image className="w-24 h-24 cursor-pointer" src={setting} alt="setting" onClick={editColumnModalOpen} />
    </>
  );
};

export default EditColumnButton;
