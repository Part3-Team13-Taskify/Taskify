import { FieldError, useForm } from 'react-hook-form';
import { putMyPagePasswordChange } from '@/src/pages/api/mypageApi';
import { useState } from 'react';
import Button from '../common/button';
import PasswordInput from '../common/input/passwordInput';
import SignModal from '../common/signModal';

interface InputForm {
  text: string;
  email: string;
  password: string;
  newpassword: string;
  passwordcheck: string;
  checkbox: boolean;
  file: string;
}

const PasswordChange = () => {
  const {
    register,
    handleSubmit, // handleSubmit 추가
    formState: { errors },
    clearErrors,
    reset,
    getValues,
    resetField,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleModal = () => {
    // open이 true일때 모달이 열림
    setOpen(!open);
  };

  const onSubmit = async (data: InputForm) => {
    const response = await putMyPagePasswordChange({ password: data.password, newPassword: data.newpassword });
    if (response && response.status !== 204) {
      setError(response.data.message);
      handleModal();
      if (response.data.message === '기존 비밀번호와 동일합니다.') {
        resetField('newpassword');
        resetField('passwordcheck');
      } else {
        resetField('password');
      }
    } else if (response && response.status === 204) {
      setError('비밀번호 변경 성공했습니다.');
      handleModal();
      reset();
    }
  };

  return (
    <div className="w-620 rounded-8 bg-white px-28 py-32 flex flex-col gap-37 mobile:gap-24 tablet:w-full">
      <p className="font-bold text-20">비밀번호 변경</p>
      <form className="flex flex-col w-564 tablet:w-488 mobile:w-244" onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          register={register('password', {
            required: {
              value: true,
              message: '8자 이상 입력해 주세요.',
            },
            pattern: {
              value: /^.{8,}$/,
              message: '8자 이상 입력해 주세요.',
            },
          })}
          type="password"
          clearError={clearErrors}
          error={errors.password as FieldError}
          inputName="password"
          inputContent="현재 비밀번호 입력"
          labelId="password"
          labelText="현재 비밀번호"
          divCheckStyle="w-564 tablet:w-488 mobile:w-244"
          divErrorFixStyle="w-564 tablet:w-488 mobile:w-244"
        />
        <PasswordInput
          register={register('newpassword', {
            required: {
              value: true,
              message: '8자 이상 입력해 주세요.',
            },
            pattern: {
              value: /^.{8,}$/,
              message: '8자 이상 입력해 주세요.',
            },
          })}
          type="password"
          clearError={clearErrors}
          error={errors.newpassword as FieldError}
          inputName="newpassword"
          inputContent="새 비밀번호 입력"
          labelId="newpassword"
          labelText="새 비밀번호"
          divCheckStyle="w-564 tablet:w-488 mobile:w-244"
          divErrorFixStyle="w-564 tablet:w-488 mobile:w-244"
          focusType="newpassword"
        />
        <PasswordInput
          register={register('passwordcheck', {
            required: {
              value: true,
              message: '비밀번호가 일치하지 않습니다.',
            },
            validate: {
              check: (val) => {
                if (getValues('newpassword') !== val) {
                  return '비밀번호가 일치하지 않습니다.';
                }
                return undefined;
              },
            },
          })}
          type="password"
          clearError={clearErrors}
          error={errors.passwordcheck as FieldError}
          inputName="passwordcheck"
          inputContent="새 비밀번호 입력"
          labelId="passwordcheck"
          labelText="새 비밀번호 확인"
          divCheckStyle="w-564 tablet:w-488 mobile:w-244"
          divErrorFixStyle="w-564 tablet:w-488 mobile:w-244"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            buttonType="decision"
            bgColor="violet"
            textColor="white"
            disabled={!!errors.password || !!errors.newpassword || !!errors.passwordcheck}
          >
            변경
          </Button>
        </div>
      </form>

      <SignModal errorText={error} openModal={open} handleModalClose={handleModal} />
    </div>
  );
};

export default PasswordChange;
