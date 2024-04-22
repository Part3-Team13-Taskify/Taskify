import Image from 'next/image';
import mainLogo from '@/public/assets/logo/mainLogo.svg';
import PasswordInput from '@/src/components/common/input/passwordInput';
import Button from '@/src/components/common/button';
import { FieldError, useForm } from 'react-hook-form';
import Input from '@/src/components/common/input';
import Link from 'next/link';

interface InputForm {
  text: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck: string;
  checkbox: boolean;
  file?: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit, // handleSubmit 추가
    formState: { errors },
    clearErrors,
    getValues,
    watch,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const onSubmit = (data: InputForm) => {
    // 폼 제출 시 실행되는 함수
    console.log(data); // 입력된 데이터 확인용
  };
  const isChecked = watch('checkbox');

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center gap-24">
        <header className="flex flex-col items-center gap-10">
          <Image className="mobile:w-120" src={mainLogo} alt="mainLogo" /> {/* 모바일 사이즈 클래스 이름 수정 */}
          <h1 className="text-20 mb-6 font-medium">오늘도 만나서 반가워요!</h1>
        </header>
        <main className="w-520 mobile:w-351">
          <div className="pb-16">
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <Input
                register={register('text', {
                  required: {
                    value: true,
                    message: '열 자 이하로 작성해주세요.',
                  },
                  pattern: {
                    value: /^.{1,10}$/,
                    message: '열 자 이하로 작성해주세요.',
                  },
                })}
                type="text"
                clearError={clearErrors}
                error={errors.text as FieldError}
                inputName="text"
                inputContent="닉네임을 입력해 주세요"
                labelId="text"
                labelText="닉네임"
                focusType="text"
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
                inputContent="8자 이상 입력해 주세요"
                labelId="password"
                labelText="비밀번호"
                focusType="password"
              />
              <PasswordInput
                register={register('passwordcheck', {
                  required: {
                    value: true,
                    message: '비밀번호가 일치하지 않습니다.',
                  },
                  validate: {
                    check: (val) => {
                      if (getValues('password') !== val) {
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
                inputContent="비밀번호를 한번 더 입력해 주세요"
                labelId="passwordcheck"
                labelText="비밀번호 확인"
                focusType="passwordcheck"
              />
              <Input
                register={register('checkbox', {})}
                type="checkbox"
                inputName="checkbox"
                inputContent=""
                labelId="checkbox"
                labelText="이용약관에 동의합니다."
                divCheckStyle="flex-row-reverse justify-end items-center h-20 gap-8 py-20"
                inputCheckStyle="w-20 h-20"
              />
              <Button
                type="submit"
                buttonType="login"
                bgColor="violet"
                textColor="white"
                disabled={Object.keys(errors).length !== 0 || !isChecked}
              >
                가입하기
              </Button>
            </form>
          </div>
        </main>
        <footer>
          <p>
            이미 가입하셨나요?
            <Link className="underline text-violet pl-10" href="/signin">
              로그인하기
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
