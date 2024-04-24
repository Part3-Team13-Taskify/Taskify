import { useRouter } from 'next/router';
import { useDashboardListStore } from '@/src/util/zustand';
import { useEffect, useState } from 'react';
import { getDashboardList } from '@/src/pages/api/dashboardEditApi';
import Link from 'next/link';
import crown from '@/public/assets/icon/crown.svg';
import Image from 'next/image';
import type { Dashboard } from '@/src/util/zustand';

const DashboardList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedDashboard, setSelectedDashboard] = useState(0);
  const dashboardList = useDashboardListStore((state) => state.dashboardList);
  const setDashboardList = useDashboardListStore((state) => state.setDashboardList);
  const handleClick = (dashboardId: number) => {
    setSelectedDashboard(dashboardId);
  };

  useEffect(() => {
    getDashboardList().then((res) => setDashboardList(res));
  }, [id]);

  return (
    <div className="w-full h-45 flex my-16 flex-col mobile:gap-30 mobile:translate-x-4">
      {dashboardList.map((data: Dashboard) => (
        <Link href={`/dashboard/${data.id}`} key={data.id}>
          <div
            key={data.id}
            className="flex my-6 rounded-4 items-center"
            role="button"
            tabIndex={0}
            onClick={() => handleClick(data.id)}
          >
            <div style={{ backgroundColor: data.color }} className="w-8 h-8 rounded-99 flex-shrink-0" />
            <p
              className={`text-18 ml-16 mr-6 tablet:text-16 tablet:ml-10 tablet:mr-4 mobile:hidden ${
                data.id === selectedDashboard && ' text-violet'
              }`}
            >
              {data.title}
            </p>
            {data.createdByMe && <Image src={crown} alt="crown" width={18} className="-translate-y-1 mobile:hidden" />}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardList;
