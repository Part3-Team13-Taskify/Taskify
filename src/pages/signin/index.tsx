import Image from 'next/image';
import mainLogo from '@/public/assets/logo/mainLogo.svg';
import PasswordInput from '@/src/components/common/input/passwordInput';
import Button from '@/src/components/common/button';
import { FieldError, useForm } from 'react-hook-form';
import Input from '@/src/components/common/input';
import Link from 'next/link';

interface InputForm {
  text?: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck?: string;
  checkbox?: boolean;
  file?: string;
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const onSubmit = (data: InputForm) => {
    console.log(data);
  };

  const newEmailValue = getValues('email');
  console.log(newEmailValue);

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center gap-24">
        <header className="flex flex-col items-center gap-10">
          <Image className="modile:w-120" src={mainLogo} alt="mainLogo" />
          <h1 className="text-20 mb-6 font-medium">오늘도 만나서 반가워요!</h1>
        </header>
        <main className="w-520 mobile:w-351">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-16">
              <Input
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
                labelText="이메일"
                focusType="email"
              />
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
                labelText="비밀번호"
              />
            </div>
            <Button
              type="submit"
              buttonType="login"
              bgColor="violet"
              textColor="white"
              disabled={Object.keys(errors).length !== 0}
            >
              로그인
            </Button>
          </form>
        </main>
        <footer>
          <p>
            회원이 아니신가요?
            <Link className="underline text-violet pl-10" href="/signup">
              회원가입하기
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signin;
