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
      <div className="flex gap-12 items-center">
        {src && <Image src={src} alt="last name initial" width={30} height={30} className="rounded-99" />}
        {text}
      </div>
      {button}
    </div>
  );
};

export default TableList;
