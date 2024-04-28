import Link from 'next/link';
import crown from '@/public/assets/icon/crown.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Image from 'next/image';
import type { Dashboard } from '@/src/util/zustand';
import React from 'react';

type DashboardListItemProps = {
  data: Dashboard;
  handleClick: (dashboardId: number) => void;
  selectedDashboard: number;
};

const MyDashboardListItem = React.memo(({ data, handleClick, selectedDashboard }: DashboardListItemProps) => (
  <Link href={`/dashboard/${data.id}`} key={data.id}>
    <div
      key={data.id}
      className="flex justify-between px-20 items-center h-70 rounded-8 bg-white border-gray-d9 border-1  tablet:h-68 mobile:w-full mobile:h-58 "
      role="button"
      tabIndex={0}
      onClick={() => handleClick(data.id)}
    >
      <div className="flex items-center">
        <div style={{ backgroundColor: data.color }} className="w-8 h-8 rounded-99 flex-shrink-0" />
        <p
          className={`text-16 font-semibold ml-16 mr-8 tablet:ml-12 tablet:mr-6 mobile:text-14 mobile:ml-12 mobile:mr-4 ${
            data.id === selectedDashboard && ' text-violet'
          }`}
        >
          {data.title}
        </p>
        {data.createdByMe && <Image src={crown} alt="crown" width={18} className="-translate-y-1" />}
      </div>
      <Image src={arrowReverse} alt="arrowReverse" />
    </div>
  </Link>
));

export default MyDashboardListItem;
