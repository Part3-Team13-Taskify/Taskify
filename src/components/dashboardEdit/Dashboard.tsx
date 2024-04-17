import { ReactNode } from 'react';
import ColorPicker from '../common/colorpicker';
import ExampleInput from '../common/input/exampleInput';
import Button from '../common/button';

interface DashboardCardProps {
  children: ReactNode;
}

const DashboardCard = ({ children }: DashboardCardProps) => {
  return <div className="w-620 rounded-8 bg-white px-28 py-32 flex flex-col gap-37">{children}</div>;
};

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
