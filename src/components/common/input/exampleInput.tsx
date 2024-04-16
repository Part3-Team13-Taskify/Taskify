import EmailInput from '@/src/components/common/input/emailInput';
import PasswordInput from '@/src/components/common/input/passwordInput';
import { FieldError, useForm } from 'react-hook-form';

interface InputForm {
  email: string;
  password: string;
}

const ExampleInput = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  return (
    <>
      <form className="flex flex-col items-start">
        <EmailInput
          register={register('email', {
            required: {
              value: true,
              message: '이메일 형식으로 작성해 주세요.',
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '이메일 형식으로 작성해 주세요.',
            },
          })}
          type="email"
          clearError={clearErrors}
          error={errors.email as FieldError}
          inputName="email"
          inputContent="이메일을 입력해 주세요"
          labelId="email"
        />
      </form>
      <form className="flex flex-col items-start">
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
          inputContent="비밀번호를 입력해 주세요"
          labelId="password"
        />
      </form>
    </>
  );
};

export default ExampleInput;
