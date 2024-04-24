// import Image from 'next/image';
// import arrow from '@/public/assets/icon/arrow.svg';
// import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import { ReactNode } from 'react';

interface TableHeaderProps {
  title: string;
  children?: ReactNode;
}

const TableHeader = ({ title, children }: TableHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-28 mobile:px-20">
      <p className="font-bold text-24 mobile:text-20 ">{title}</p>
      <div className="flex gap-16 items-center mobile:gap-12">{children}</div>
    </div>
  );
};

export default TableHeader;
