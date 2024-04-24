import Image from 'next/image';
import mainLogo from '@/public/assets/logo/mainLogo.svg';
import PasswordInput from '@/src/components/common/input/passwordInput';
import Button from '@/src/components/common/button';
import { FieldError, useForm } from 'react-hook-form';
import Input from '@/src/components/common/input';
import Link from 'next/link';
import postUser from '@/src/api/userApi';
import { useRouter } from 'next/router';
import SignModal from '@/src/components/common/signModal';
import { useEffect, useState } from 'react';

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
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleModal = () => {
    // open이 true일때 모달이 열림
    setOpen(!open);
  };

  const onSubmit = async (data: InputForm) => {
    const body = { email: data.email, password: data.password };
    const response = await postUser('auth/login', body);
    if (response && response.status === 201) {
      // 로그인 성공, mydashboard 이동 + 토큰
      window.localStorage.setItem('accessToken', response.data.accessToken);
      router.push('/my-dashboard');
    } else {
      // 로그인 실패, 오류메세지를 품은 모달창
      setError(response ? response.data.message : '');
      handleModal(); // 오픈일때 오류가 보이게
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      router.push('/my-dashboard');
    }
  });

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center gap-24">
        <header className="flex flex-col items-center gap-10">
          <Image className="modile:w-120" src={mainLogo} alt="mainLogo" />
          <h1 className="text-20 mb-6 font-medium">오늘도 만나서 반가워요!</h1>
        </header>
        <main>
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
                labelDropStyle="w-520 mobile:w-351"
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
      <SignModal errorText={error} openModal={open} handleModalClose={handleModal} />
    </div>
  );
};

export default Signin;
