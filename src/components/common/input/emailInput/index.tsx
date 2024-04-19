import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';

interface EmailInputForm {
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
  clearError: UseFormClearErrors<EmailInputForm>;
}

const EmailInput = ({ register, inputName, inputContent, labelId, error, clearError }: InputProps) => {
  return (
    <div className="flex flex-col items-start py-8 text-gray-9f text-16">
      <label className="text-black-33" htmlFor="email">
        이메일
      </label>
      <input
        {...register}
        type="email"
        name={inputName}
        className={
          error?.message
            ? 'w-full h-50 py-15 px-16 border-1 rounded-lg border-red text-black-33'
            : 'w-full h-50 py-15 px-16 border-1 rounded-lg border-gray-9f text-black-33 focus:outline-none  focus:border-violet'
        }
        placeholder={inputContent}
        id={labelId}
        onFocus={() => clearError('email')}
      />
      {error?.message && <div className="text-red text-14">{error.message}</div>}
    </div>
  );
};

export default EmailInput;
