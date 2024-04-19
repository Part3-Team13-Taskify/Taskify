import Image from 'next/image';
import eyeOff from '@/public/assets/icon/eyeOff.svg';
import eyeOn from '@/public/assets/icon/eyeOn.svg';
import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

interface InputForm {
  email: string;
  password: string;
}
interface InputProps {
  inputName: string;
  inputContent: string;
  labelId: string;
  type: 'email' | 'password';
  register: UseFormRegisterReturn;
  error: FieldError;
  clearError: UseFormClearErrors<InputForm>;
}

const PasswordInput = ({ register, inputName, inputContent, labelId, error, clearError }: InputProps) => {
  const [openEye, setOpenEye] = useState(false);

  const toggleEye = () => {
    setOpenEye(!openEye);
  };

  return (
    <div className="flex flex-col items-start py-8 text-gray-9f text-16">
      <label className="text-black-33" htmlFor="password">
        비밀번호
      </label>
      <div
        className={
          error?.message
            ? 'flex flex-row justify-between w-full h-50 py-15 px-16 border-1 rounded-lg border-red'
            : 'flex flex-row  justify-between w-full h-50 py-15 px-16 border-1 rounded-lg border-gray-9f focus:outline-none  focus:border-violet'
        }
      >
        <input
          {...register}
          type={openEye ? 'text' : 'password'}
          name={inputName}
          className={error?.message ? ' text-black-33' : ' text-black-33 '}
          placeholder={inputContent}
          id={labelId}
          onFocus={() => clearError('password')}
        />
        <Image className="" onClick={toggleEye} src={openEye ? eyeOn : eyeOff} alt={openEye ? 'eyeOn' : 'eyeOff'} />
      </div>
      {error?.message && <div className="text-red text-14">{error.message}</div>}
    </div>
  );
};
export default PasswordInput;
