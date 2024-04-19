import { ReactNode } from 'react';

type Props = {
  htmlFor: string;
  label: string;
  children: ReactNode;
  isRequired?: boolean;
};

const TaskLabel = ({ htmlFor, label, children, isRequired }: Props) => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <label htmlFor={htmlFor} className="text-18">
        {label}
        {isRequired && <span className="text-violet"> *</span>}
      </label>
      {children}
    </div>
  );
};

export default TaskLabel;
