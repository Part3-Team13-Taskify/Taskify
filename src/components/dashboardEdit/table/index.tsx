import { ReactNode } from 'react';

interface TableProps {
  label: string;
  children: ReactNode;
}

const Table = ({ label, children }: TableProps) => {
  return (
    <div className="flex flex-col px-28 mobile:px-20">
      <p className=" mb-16 text-gray-9f">{label}</p>
      {children}
    </div>
  );
};

export default Table;
