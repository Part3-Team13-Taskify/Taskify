import React, { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import instance from '@/src/util/axios';
import { useRouter } from 'next/router';
import Button from '../../common/button';
import Modal from '../../common/modal';
import ColorPicker from '../../common/colorpicker';
import Input, { InputForm } from '../../common/input';

interface AddDashboardModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const AddDashboardModal: React.FC<AddDashboardModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }
  const [selectedColor, setSelectedColor] = useState<string>('');
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const router = useRouter();
  const handleCreateDashboard = async () => {
    const dashboardTitle = getValues('text') || '';
    try {
      const data = { title: dashboardTitle, color: selectedColor };
      await instance.post(`/dashboards/`, data).then((res) => router.push(`/dashboard/${res.data.id}`));
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="mb-32 text-24 font-bold mobile:mb-24 mobile:text-20">새로운 대시보드</div>
      <form className="flex flex-col" onSubmit={handleSubmit(handleCreateDashboard)}>
        <Input
          inputName="text"
          inputContent="뉴프로젝트"
          labelId="text"
          labelText="대시보드 이름"
          type="text"
          register={register('text', {
            required: {
              value: true,
              message: '대시보드 이름을 입력해주세요',
            },
          })}
          clearError={clearErrors}
          error={errors.text as FieldError}
          inputCheckStyle="flex my-10"
          labelDropStyle="w-full"
        />
        <div className="mb-28">
          <ColorPicker modal selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>
        <div className="flex justify-end gap-16">
          <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            buttonType="modal2"
            bgColor="violet"
            textColor="white"
            type="submit"
            onClick={handleSubmit(handleCreateDashboard)}
          >
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDashboardModal;
