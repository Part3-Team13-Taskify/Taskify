import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputForm {
  text?: string;
  email?: string;
  password?: string;
  newpassword?: string;
  passwordcheck?: string;
  file?: string;
}
interface InputProps {
  inputName: string;
  inputContent?: string;
  labelId: string;
  labelText?: string;
  type: any;
  register: UseFormRegisterReturn;
  error?: FieldError;
  clearError?: UseFormClearErrors<InputForm>;
  divCheckStyle?: string;
  inputCheckStyle?: string;
  inputErrorFixStyle?: string;
  labelDropStyle?: string;
  focusType?: string;
  children?: React.ReactNode;
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
  focusType,
  divCheckStyle,
  inputCheckStyle,
  inputErrorFixStyle,
  labelDropStyle,
  children,
}: InputProps) => {
  const divStyle = twMerge(`flex flex-col items-start py-8 text-gray-9f text-16`, divCheckStyle);
  const inputStyle = twMerge(
    'w-full h-50 py-15 px-16 border-1 rounded-lg border-gray-9f text-black-33 focus:outline-none  focus:border-violet',
    inputCheckStyle,
  );
  const inputErrorStyle = twMerge(
    `w-full h-50 py-15 px-16 border-1 rounded-lg border-red text-black-33`,
    inputErrorFixStyle,
  );
  const labelStyle = twMerge(`text-black-33`, labelDropStyle);
  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={labelId}>
        {labelText}
        {children}
        <input
          {...register}
          type={type}
          name={inputName}
          className={error?.message ? inputErrorStyle : inputStyle}
          placeholder={inputContent}
          id={labelId}
          onFocus={() => {
            switch (focusType) {
              case 'text':
                return clearError ? clearError('text') : '';
              case 'email':
                return clearError ? clearError('email') : '';
              case 'newpassword':
                return clearError ? clearError('newpassword') : '';
              case 'password':
                return clearError ? clearError('password') : '';
              default:
                return clearError ? clearError('text') : '';
            }
          }}
        />
      </label>
      {error?.message && <div className="text-red text-14">{error.message}</div>}
    </div>
  );
};

export default Input;
