import Link from 'next/link';
import crown from '@/public/assets/icon/crown.svg';
import Image from 'next/image';
import type { Dashboard } from '@/src/util/zustand';
import React from 'react';

type DashboardListItemProps = {
  data: Dashboard;
  handleClick: (dashboardId: number) => void;
  selectedDashboard: number;
};

const DashboardListItem = React.memo(({ data, handleClick, selectedDashboard }: DashboardListItemProps) => (
  <Link href={`/dashboard/${data.id}`} key={data.id}>
    <div
      key={data.id}
      className="flex my-6 rounded-4 items-center justify-between "
      role="button"
      tabIndex={0}
      onClick={() => handleClick(data.id)}
    >
      <div className="flex items-center">
        <div style={{ backgroundColor: data.color }} className="w-8 h-8 rounded-99 flex-shrink-0" />
        <p
          className={`text-18 ml-16 mr-6 tablet:text-16 tablet:ml-10 tablet:mr-4 mobile:hidden ${
            data.id === selectedDashboard && ' text-violet'
          }`}
        >
          {data.title}
        </p>
      </div>
      {data.createdByMe && <Image src={crown} alt="crown" width={18} className="-translate-y-1 mobile:hidden" />}
    </div>
  </Link>
));

export default DashboardListItem;
