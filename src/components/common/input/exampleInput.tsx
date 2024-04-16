import EmailInput from '@/src/components/common/input/emailInput';
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
              message: '이메일을 입력해 주세요.',
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 주소가 아닙니다.',
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
    </>
  );
};

export default ExampleInput;
