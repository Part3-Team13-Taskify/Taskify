import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  htmlFor?: string;
  label: string;
  children: ReactNode;
  isRequired?: boolean;
  divClass?: string;
};

const TaskLabel = ({ htmlFor, label, children, isRequired, divClass }: Props) => {
  const styleClass = twMerge('flex flex-col gap-10 w-full', divClass);
  return (
    <div className={styleClass}>
      <label htmlFor={htmlFor} className="text-18">
        {label}
        {isRequired && <span className="text-violet"> *</span>}
      </label>
      {children}
    </div>
  );
};

export default TaskLabel;
