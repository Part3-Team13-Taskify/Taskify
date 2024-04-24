import { useState } from 'react';
import { postColumns } from '@/src/api/columnsApi';
import { useForm } from 'react-hook-form';

import Button from '../../common/button';
import Modal from '../../common/modal';
import Input from '../../common/input';

interface AddColumnModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  dashboardId: number;
}

interface InputForm {
  text: string;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({ openModal, handleModalClose, dashboardId }) => {
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

      const columnData = { title: data.text, dashboardId: dashboardId };
      await postColumns(columnData);

      handleModalClose();
    } catch (error) {
      console.error('Failed to post columns data:', error);
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
      <div className="mb-32 text-24 font-bold mobile:mb-24">새 컬럼 생성</div>
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
          // clearError={clearErrors}
          // error={errors.text}
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
