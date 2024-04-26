import { useState } from 'react';
import { postColumns } from '@/src/pages/api/columnsApi';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Button from '../../common/button';
import Modal from '../../common/modal';
import Input from '../../common/input';

type Columns = {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface AddColumnModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  dashboardId: number;
  setColumnsList: React.Dispatch<React.SetStateAction<Columns[]>>;
  columnsList: Columns[];
}

interface InputForm {
  text: string;
}

interface ErrorResponse {
  message: string;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({
  openModal,
  handleModalClose,
  dashboardId,
  setColumnsList,
  columnsList,
}) => {
  const {
    register,
    handleSubmit, // handleSubmit 추가
    formState: { errors },
    watch,
    reset,
    setError,
    // clearErrors,
  } = useForm<InputForm>({ mode: 'onChange', reValidateMode: 'onChange' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // watch를 사용하여 입력 필드의 값을 실시간으로 확인
  const textValue = watch('text');

  const handleCloseModal = () => {
    reset();
    handleModalClose();
  };
  const onSubmit = async (data: InputForm) => {
    // 이미 요청 중인 경우 무시
    if (isSubmitting) {
      return;
    }

    // 컬럼 중복 체크
    const isDuplicate = columnsList.some((column) => column.title === data.text);
    if (isDuplicate) {
      setError('text', {
        type: 'manual',
        message: '중복된 컬럼 이름입니다.',
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const columnData = { title: data.text, dashboardId: dashboardId };
      const response = await postColumns(columnData);
      setColumnsList((prevColumns) => [...prevColumns, response]);

      handleCloseModal();
    } catch (error) {
      // 컬럼 10개 초과시 에러메시지
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.status === 400) {
        setError('text', {
          type: 'manual',
          message: axiosError.response.data.message,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleCloseModal}>
      <div className="mb-32 text-24 font-bold mobile:mb-24">새 컬럼 생성</div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          divCheckStyle="py-0"
          labelDropStyle="w-full text-18"
          inputCheckStyle="mb-28 mt-10 text-16 mobile:mb-24"
          inputName="text"
          inputContent="새로운 컬럼"
          labelId="text"
          labelText="이름"
          type="text"
          // clearError={clearErrors}
          error={errors.text}
          register={register('text', {
            required: {
              value: true,
              message: '컬럼 이름을 입력해주세요',
            },
          })}
        />

        <div className="flex flex-row-reverse gap-12 mobile:gap-11">
          <Button
            type="submit"
            buttonType="modal2"
            bgColor="violet"
            textColor="white"
            disabled={!textValue || !!errors.text || isSubmitting}
          >
            생성
          </Button>
          <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleCloseModal}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
