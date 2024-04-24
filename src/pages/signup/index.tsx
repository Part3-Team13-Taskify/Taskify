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

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleModal = () => {
    // open이 true일때 모달이 열림
    setOpen(!open);
    if (success === true) {
      router.push('/signin');
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      router.push('/my-dashboard');
    }
  });

  const onSubmit = async (data: InputForm) => {
    const body = { email: data.email, nickname: data.text, password: data.password };
    const response = await postUser('users', body);
    if (response && response.status === 201) {
      // 회원가입 성공, 성공한 모달창 + signin 이동
      setError('가입이 완료되었습니다!');
      handleModal();
      setSuccess(true);
    } else {
      // 회원가입 실패, 오류메세지를 품은 모달창
      setError(response ? response.data.message : '');
      handleModal(); // 오픈일때 오류가 보이게
    }
  };
  const isChecked = watch('checkbox');

  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center gap-24">
        <header className="flex flex-col items-center gap-10">
          <Image className="mobile:w-120" src={mainLogo} alt="mainLogo" /> {/* 모바일 사이즈 클래스 이름 수정 */}
          <h1 className="text-20 mb-6 font-medium">오늘도 만나서 반가워요!</h1>
        </header>
        <main>
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
                labelDropStyle="w-520 mobile:w-351"
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
                divCheckStyle="flex flex-row-reverse justify-end items-center h-20 gap-8 py-20"
                labelDropStyle="flex flex-row-reverse items-center gap-8"
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
      <SignModal errorText={error} openModal={open} handleModalClose={handleModal} />
    </div>
  );
};

export default Signup;
