import { FieldError, useForm } from 'react-hook-form';
import Image from 'next/image';
import add from '@/public/assets/icon/addViolet.svg';
import { useEffect, useState } from 'react';
import { getMyPageProfile, postMyPageProfile, putMyPageProfile } from '@/src/pages/api/mypageApi';
import { useMyProfileStore } from '@/src/util/zustand';
import Button from '../common/button';
import Input from '../common/input';
import SignModal from '../common/signModal';

interface InputForm {
  text?: string;
  email?: string;
  password?: string;
  newpassword?: string;
  passwordcheck?: string;
  checkbox?: boolean;
  file?: string;
}

const Profile = () => {
  const [temp, setTemp] = useState(''); // 이미지 url이 담김
  const setMyProfile = useMyProfileStore((state) => state.setMyProfile);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<InputForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: async () => {
      // defaultValues : form의 기본값을 정해줄수있음 -> 이용해서 이메일, 닉네임 전달해주기
      const response = await getMyPageProfile();
      setTemp(response.profileImageUrl); // 처음 서버에서 url을 받아서 브라우저 url에 넣어줌
      return { email: response.email, text: response.nickname, file: temp }; // 가져온 사용자 정보 확인용
    },
  });

  const [open, setOpen] = useState(false);

  const handleModal = () => {
    // open이 true일때 모달이 열림
    setOpen(!open);
  };

  const imagefile = watch('file'); // watch를 통해서 input의 value를 가져옴 : 능동적으로 움직여야해서 getValue말고 watch를 씀

  // 이미지 미리보기(브라우저에 임시 전달)
  useEffect(() => {
    if (imagefile && imagefile.length > 0) {
      setTemp(URL.createObjectURL(new Blob([imagefile[0]], { type: 'image/png' }))); // file의 url을 서버까지 전송하지 않고 브라우저에 임시적으로 저장하기 위해 URL.createObjectURL()사용
      // new Blob 첫 인자엔 쓸 값, 두번째 인자엔 타입(이미지 png를 쓸거)
    }
  }, [imagefile]);

  // 버튼클릭시, 새 닉네임, 이미지 url 전달
  const onSubmit = async (data: InputForm) => {
    if (temp === null || temp === '') {
      handleModal();
    }
    // 이미지 url전달(서버에 최종전달)
    if (data.file && data.file.length === 1) {
      // data.file 키로 0, length가 있는데, 0은 url이므로 판별이 어려움
      const formdata = new FormData();
      formdata.append('image', data.file[0]);
      const response = await postMyPageProfile(formdata);
      const putdata = { nickname: data.text, profileImageUrl: response.profileImageUrl };
      const updatedMyProfile = await putMyPageProfile(putdata);
      setMyProfile(updatedMyProfile);
    } else {
      const putdata = { nickname: data.text, profileImageUrl: data.file ? data.file : '' }; // nickname만 필요하지만 put은 전체 데이터를 요구
      const updatedMyProfile = await putMyPageProfile(putdata);
      setMyProfile(updatedMyProfile);
    }
  };

  const handleBack = () => {
    setTemp('');
  };

  return (
    <div className="w-620 rounded-8 bg-white px-28 py-32 flex flex-col gap-37 mobile:gap-24 tablet:w-full">
      <p className="font-bold text-20">프로필</p>

      <form className="flex flex-row w-366 tablet:w-290 mobile:flex-col mobile:w-244" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register('file', {})}
          type="file"
          inputName="file"
          labelId="file"
          focusType="file"
          divCheckStyle="flex items-center justify-center w-182 h-182 mr-16 py-0"
          inputCheckStyle="hidden "
          labelDropStyle="flex flex-col relative items-center justify-center w-182 h-182 border-2 bg-gray-fa border-dashed rounded-6 cursor-pointerdark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {temp === null || temp === '' ? (
            <Image src={add} width={40} height={40} alt="add icon" />
          ) : (
            <>
              <Image src={temp} width={202} height={202} className="overflow-hidden rounded-6 " alt="profile image" />
              <button
                onClick={handleBack}
                className="bg-violet w-25 h-25 border rounded-full text-white absolute -top-10 -left-10"
              >
                X
              </button>
            </>
          )}
        </Input>
        <div>
          <Input
            register={register('email', {
              disabled: true,
            })}
            type="email"
            clearError={clearErrors}
            error={errors.email as FieldError}
            inputName="email"
            inputContent="이메일을 입력해 주세요"
            labelId="email"
            labelText="이메일"
            focusType="email"
            inputCheckStyle="w-366 tablet:w-290 mobile:w-244"
            inputErrorFixStyle="w-366 tablet:w-290 mobile:w-244"
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
            inputCheckStyle="w-366 tablet:w-290 mobile:w-244"
            inputErrorFixStyle="w-366 tablet:w-290 mobile:w-244"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              buttonType="decision"
              bgColor="violet"
              textColor="white"
              disabled={!!errors.email || !!errors.text}
            >
              저장
            </Button>
          </div>
        </div>
      </form>
      <SignModal errorText="이미지는 필수 요소입니다." openModal={open} handleModalClose={handleModal} />
    </div>
  );
};

export default Profile;
