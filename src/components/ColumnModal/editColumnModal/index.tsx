import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useModal from '@/src/hooks/useModal';
import { putColumns } from '@/src/pages/api/columnsApi';
import Button from '../../common/button';
import Modal from '../../common/modal';
import ModalPortal from '../../common/modalPortal';
import DeleteColumnModal from '../deleteColumnModal';
import Input from '../../common/input';

type Columns = {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface EditColumnModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  dashboardId: number;
  columnsTitle: string;
  columnId: number;
  setColumnsList: React.Dispatch<React.SetStateAction<Columns[]>>;
  columnsList: Columns[];
}

interface InputForm {
  text: string;
}

const EditColumnModal: React.FC<EditColumnModalProps> = ({
  openModal,
  handleModalClose,
  columnsTitle,
  columnId,
  setColumnsList,
  columnsList,
}) => {
  const {
    openModal: deleteColumnModal,
    handleModalClose: deleteColumnModalClose,
    handleModalOpen: deleteColumnModalOpen,
  } = useModal();

  const {
    register,
    handleSubmit, // handleSubmit 추가
    formState: { errors },
    watch,
    reset,
    // setError,
    // clearErrors,
  } = useForm<InputForm>({ mode: 'onChange', reValidateMode: 'onChange' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // watch를 사용하여 입력 필드의 값을 실시간으로 확인
  const textValue = watch('text');

  const onSubmit = async (data: InputForm) => {
    // 이미 요청 중인 경우 무시
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await putColumns(columnId, data.text);
      const updatedColumns = columnsList.map((column) => {
        if (column.id === columnId) {
          return { ...column, title: data.text };
        }
        return column;
      });
      setColumnsList(updatedColumns);
      handleModalClose();
    } catch (error) {
      console.error('Error editing column', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    reset();
    handleModalClose();
  };

  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleCloseModal}>
      <div className="mb-32 text-24 font-bold">컬럼 관리</div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          divCheckStyle="py-0"
          labelDropStyle="w-full text-18"
          inputCheckStyle="mb-28 mt-10 text-16 mobile:mb-24"
          inputName="text"
          inputContent="새로운 프로젝트"
          labelId="text"
          labelText="이름"
          type="text"
          defaultValue={columnsTitle}
          // clearError={clearErrors}
          // error={errors.text}
          register={register('text', {
            required: {
              value: true,
              message: '컬럼 이름을 입력해주세요',
            },
          })}
        />

        <div className="flex flex-row-reverse justify-between mobile:flex-col-reverse">
          <div className="flex flex-row-reverse gap-12 mobile:gap-11 ">
            <Button
              type="submit"
              buttonType="modal2"
              bgColor="violet"
              textColor="white"
              disabled={!textValue || !!errors.text}
            >
              변경
            </Button>
            <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleCloseModal}>
              취소
            </Button>
          </div>

          <div className="flex flex-col-reverse mobile:flex-row">
            <ModalPortal>
              <DeleteColumnModal
                openModal={deleteColumnModal}
                handleModalClose={deleteColumnModalClose}
                columnId={columnId}
                setColumnsList={setColumnsList}
              />
            </ModalPortal>
            <span
              className="text-14 text-gray-78 underline cursor-pointer mobile:mb-16"
              onClick={deleteColumnModalOpen}
            >
              삭제하기
            </span>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditColumnModal;
