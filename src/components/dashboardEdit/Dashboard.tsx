import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import ColorPicker from '../common/colorpicker';
import ExampleInput from '../common/input/exampleInput';
import Button from '../common/button';
import Table from './table';
import TableHeader from './table/TableHeader';

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({ children, className }: DashboardCardProps) => {
  const mergedClasses = twMerge('w-620 rounded-8 bg-white px-28 py-32 flex flex-col gap-37', className);
  return <div className={mergedClasses}>{children}</div>;
};

const Dashboard = () => {
  return (
    <>
      <DashboardCard>
        <div className="flex justify-between">
          <p className="font-bold text-20">비브리지</p>
          <ColorPicker />
        </div>
        {/* 인풋 컴포넌트로 대체 */}
        <ExampleInput />
        <div className="flex justify-end">
          <Button buttonType="modal1" bgColor="violet" textColor="white">
            변경
          </Button>
        </div>
      </DashboardCard>

      <DashboardCard className="px-0 pb-0">
        <TableHeader title="구성원" />
        <Table />
      </DashboardCard>

      <DashboardCard className="px-0 pb-0">
        <TableHeader title="초대 내역">
          <Button buttonType="columnAdd">초대하기</Button>
        </TableHeader>
        <Table />
      </DashboardCard>
    </>
  );
};

export default Dashboard;
