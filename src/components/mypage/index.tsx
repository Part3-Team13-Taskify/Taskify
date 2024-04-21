import { FieldError, useForm } from 'react-hook-form';
import arrow from '@/public/assets/icon/arrow.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import add from '@/public/assets/icon/addViolet.svg';
import DashboardCard from '../dashboardEdit/DashboardCard';
import Button from '../common/button';
import Input from '../common/input';

import PasswordInput from '../common/input/passwordInput';

interface InputForm {
  text: string;
  email: string;
  password: string;
  newpassword: string;
  passwordcheck: string;
  checkbox: boolean;
  file: string;
}

const MyPageContent = () => {
  const {
    register,
    handleSubmit, // handleSubmit 추가
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const onSubmit = (data: InputForm) => {
    // 폼 제출 시 실행되는 함수
    console.log(data); // 입력된 데이터 확인용
  };

  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="flex p-20 flex-col bg-gray-fa w-full gap-25 pb-56">
      <Link href={`/dashboard/${id}`} className="flex gap-8">
        <Image src={arrow} alt="go back" width={20} />
        <p className="font-semibold">돌아가기</p>
      </Link>
      <DashboardCard>
        <p className="font-bold text-20">프로필</p>
        <div className="flex">
          <Input
            register={register('file', {})}
            type="file"
            clearError={clearErrors}
            error={errors.email as FieldError}
            inputName="file"
            labelId="file"
            focusType="file"
            divCheckStyle="flex items-center justify-center w-full"
            inputCheckStyle="hidden"
            labelDropStyle="flex flex-col items-center justify-center w-182 pt-5 pb-6 h-182 border-2 bg-gray-fa border-dashed rounded-6 cursor-pointerdark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <Image src={add} alt="add profile image" />
          </Input>
          <form className="w-366 tablet:w-290 mobile:w-244" onSubmit={handleSubmit(onSubmit)}>
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
            />
          </form>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            buttonType="decision"
            bgColor="violet"
            textColor="white"
            disabled={Object.keys(errors).length !== 0}
          >
            저장
          </Button>
        </div>
      </DashboardCard>
      <DashboardCard>
        <p className="font-bold text-20">비밀번호 변경</p>
        <div className="flex">
          <form className="w-564 tablet:w-488 mobile:w-244" onSubmit={handleSubmit(onSubmit)}>
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
              labelName="현재 비밀번호"
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
              inputContent="8자 이상 입력해 주세요"
              labelId="newpassword"
              labelName="새 비밀번호"
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
              inputContent="비밀번호를 한번 더 입력해 주세요"
              labelId="passwordcheck"
              labelName="새 비밀번호 확인"
            />
          </form>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            buttonType="decision"
            bgColor="violet"
            textColor="white"
            disabled={Object.keys(errors).length !== 0}
          >
            변경
          </Button>
        </div>
      </DashboardCard>
    </main>
  );
};

export default MyPageContent;
