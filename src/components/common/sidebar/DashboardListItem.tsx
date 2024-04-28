import Link from 'next/link';
import crown from '@/public/assets/icon/crown.svg';
import Image from 'next/image';
import type { Dashboard } from '@/src/util/zustand';
import React from 'react';
import useDashboardList from '@/src/hooks/useDashboardList';
import { useDashboardListStore } from '@/src/util/zustand';

const DashboardListItem = () => {
  const dashboardListData = useDashboardListStore((state) => state.dashboardListData);
  const { selectedDashboard, handleClickDashboard } = useDashboardList();

  return (
    <>
      {dashboardListData.map((data: Dashboard) => (
        <Link href={`/dashboard/${data.id}`} key={data.id}>
          <div
            className="transition-all duration-100 flex my-6 rounded-4 items-center justify-between "
            role="button"
            tabIndex={0}
            style={{ backgroundColor: data.id === selectedDashboard.id ? data.color : undefined }}
            onClick={() => handleClickDashboard(data)}
          >
            <div className="flex items-center">
              <div style={{ backgroundColor: data.color }} className="w-8 h-8 rounded-99 flex-shrink-0" />
              <p
                className={`text-18 ml-16 mr-6 tablet:text-16 tablet:ml-10 tablet:mr-4 mobile:hidden ${
                  data.id === selectedDashboard.id && 'text-white'
                }`}
              >
                {data.title}
              </p>
            </div>
            {data.createdByMe && <Image src={crown} alt="crown" width={18} className="-translate-y-1 mobile:hidden" />}
          </div>
        </Link>
      ))}
    </>
  );
};

export default DashboardListItem;
