import Image from 'next/image';
import mainLogo from '@/public/assets/logo/mainLogo.svg';
import EmailInput from '@/src/components/common/input/emailInput';
import PasswordInput from '@/src/components/common/input/passwordInput';
import Button from '@/src/components/common/button';
import { FieldError, useForm } from 'react-hook-form';

interface InputForm {
  email: string;
  password: string;
}

const Signin = () => {
  const {
    register,
    handleSubmit, // handleSubmit 추가
    formState: { errors },
    clearErrors,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const onSubmit = (data: InputForm) => {
    // 폼 제출 시 실행되는 함수
    console.log(data); // 입력된 데이터 확인용
  };

  return (
    <div className="">
      <div className="h-screen flex flex-col justify-center items-center gap-24">
        <header className="flex flex-col items-center gap-10">
          <Image src={mainLogo} alt="mainLogo" />
          <h1 className="text-20 mb-6 font-medium">오늘도 만나서 반가워요!</h1>
        </header>
        <main className="w-520">
          <div className="pb-16">
            <form onSubmit={handleSubmit(onSubmit)}>
              {' '}
              {/* handleSubmit 함수를 onSubmit 이벤트 핸들러로 설정 */}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              {' '}
              {/* handleSubmit 함수를 onSubmit 이벤트 핸들러로 설정 */}
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
          </div>
          <Button
            type="submit"
            buttonType="login"
            bgColor="violet"
            textColor="white"
            disabled={Object.keys(errors).length !== 0} // errors 객체가 비어있지 않으면 disabled로 설정
          >
            로그인
          </Button>
        </main>
        <footer>
          <p>
            회원이 아니신가요?{' '}
            <a className="underline text-violet" href="/signup">
              회원가입하기
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signin;
