import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactNode } from 'react';

interface TableListProps {
  src?: StaticImport;
  text: string;
  button: ReactNode;
}

const TableList = ({ src, text, button }: TableListProps) => {
  return (
    <div className="flex items-center justify-between border-b-1 py-16">
      <div className="flex gap-12 items-center px-28">
        {src && <Image src={src} alt="last name initial" />}
        {text}
      </div>
      <div className="px-28">{button}</div>
    </div>
  );
};

export default TableList;