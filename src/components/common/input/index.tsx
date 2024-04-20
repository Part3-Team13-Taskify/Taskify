import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputForm {
  text?: string;
  email?: string;
  password?: string;
  passwordcheck?: string;
}
interface InputProps {
  inputName: string;
  inputContent: string;
  labelId: string;
  labelText: string;
  type: any;
  register: UseFormRegisterReturn;
  error?: FieldError;
  clearError?: UseFormClearErrors<InputForm>;
  divCheckStyly?: string;
  inputCheckStyle?: string;
}

const Input = ({
  register,
  inputName,
  inputContent,
  labelId,
  labelText,
  type,
  error,
  clearError,
  divCheckStyly,
  inputCheckStyle,
}: InputProps) => {
  const divStyle = twMerge(`flex flex-col items-start py-8 text-gray-9f text-16`, divCheckStyly);
  const inputStyle = twMerge(
    'w-full h-50 py-15 px-16 border-1 rounded-lg border-gray-9f text-black-33 focus:outline-none  focus:border-violet',
    inputCheckStyle,
  );
  return (
    <div className={divStyle}>
      <label className="text-black-33" htmlFor={labelId}>
        {labelText}
      </label>
      <input
        {...register}
        type={type}
        name={inputName}
        className={error?.message ? 'w-full h-50 py-15 px-16 border-1 rounded-lg border-red text-black-33' : inputStyle}
        placeholder={inputContent}
        id={labelId}
        onFocus={() => (clearError ? clearError(['text', 'email', 'password']) : '')}
      />
      {error?.message && <div className="text-red text-14">{error.message}</div>}
    </div>
  );
};

export default Input;
