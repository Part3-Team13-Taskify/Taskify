import React, { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import instance from '@/src/util/axios';
import { useRouter } from 'next/router';
import Button from '../common/button';
import Modal from '../common/modal';
import Input, { InputForm } from '../common/input';

interface InviteModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const router = useRouter();
  const { id } = router.query;

  const handleInvite = async () => {
    const email = getValues('email') || '';
    try {
      const data = { email: email };
      await instance.post(`/dashboards/${id}/invitations`, data);
      handleModalClose();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('email', {
          type: 'server',
          message: `${error.response.data.message}`,
        });
      }
    }
  };

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="mb-32 text-24 font-bold mobile:mb-24 mobile:text-20">초대하기</div>
      <form className="flex flex-col" onSubmit={handleSubmit(handleInvite)}>
        <Input
          inputName="email"
          inputContent="example@example.com"
          labelId="email"
          labelText="이메일"
          type="email"
          register={register('email', {
            required: {
              value: true,
              message: '이메일을 입력해주세요.',
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '이메일 형식으로 작성해 주세요.',
            },
          })}
          clearError={clearErrors}
          error={errors.email as FieldError}
          inputCheckStyle="flex my-10"
          labelDropStyle="w-full"
        />

        <div className="flex justify-end gap-16">
          <Button buttonType="modal2" bgColor="white" textColor="gray" onClick={handleModalClose}>
            취소
          </Button>
          <Button
            buttonType="modal2"
            bgColor="violet"
            textColor="white"
            type="submit"
            onClick={handleSubmit(handleInvite)}
          >
            초대
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteModal;
