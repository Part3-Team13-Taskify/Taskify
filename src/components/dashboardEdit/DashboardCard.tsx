import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({ children, className }: DashboardCardProps) => {
  const mergedClasses = twMerge('w-620 rounded-8 bg-white px-28 py-32 flex flex-col gap-37', className);
  return <div className={mergedClasses}>{children}</div>;
};

export default DashboardCard;
