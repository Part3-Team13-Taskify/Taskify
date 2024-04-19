import Image from 'next/image';
import logo from '@/public/assets/logo/violetHeaderLogo.svg';
import add from '@/public/assets/icon/addBox.svg';
import mobileLogo from '@/public/assets/logo/violetHeaderMobileLogo.svg';
import blue from '@/public/assets/chip/ellipseBlueLarge.svg';
import green from '@/public/assets/chip/ellipseGreenLarge.svg';
import pink from '@/public/assets/chip/ellipsePinkLarge.svg';
import purple from '@/public/assets/chip/ellipsePurpleLarge.svg';
import yellow from '@/public/assets/chip/ellipseYellowLarge.svg';
import crown from '@/public/assets/icon/crown.svg';
import { useState } from 'react';
import { faker } from '@faker-js/faker';

// {
//   "cursorId": 0,
//   "totalCount": 0,
//   "dashboards": [
//     {
//       "id": 0,
//       "title": "string",
//       "color": "string",
//       "createdAt": "2024-04-19T05:42:59.505Z",
//       "updatedAt": "2024-04-19T05:42:59.505Z",
//       "createdByMe": true,
//       "userId": 0
//     }
//   ]
// }

type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
};

export const COLORS: string[] = ['green', 'blue', 'pink', 'purple', 'orange'];

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
}

export function createRandomDashboard(): Dashboard {
  return {
    id: faker.datatype.number(),
    title: faker.internet.userName(),
    color: getRandomColor(),
    createdByMe: faker.datatype.boolean(),
  };
}

export const DASHBOARDS: Dashboard[] = faker.helpers.multiple(createRandomDashboard, {
  count: 15,
});

interface ColorSources {
  [key: string]: string;
  green: string;
  blue: string;
  pink: string;
  purple: string;
  orange: string;
}

const colorSources: ColorSources = {
  green,
  blue,
  pink,
  purple,
  orange: yellow,
};

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

const DashboardList = () => {
  const [selectedDashboard, setSelectedDashboard] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = items.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  const handleClick = (id: number) => {
    setSelectedDashboard(id);
  };

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
  //   setItemOffset(newOffset);
  // };

  return (
    <div className="w-full h-45 flex my-16 flex-col mobile:gap-30 mobile:translate-x-4">
      {DASHBOARDS.map((data: Dashboard) => (
        // <Link href={`/dashboard/${data.id}`} key={data.id}>
        <div
          key={data.id}
          className="flex my-6 rounded-4"
          role="button"
          tabIndex={0}
          onClick={() => handleClick(data.id)}
        >
          <Image src={colorSources[data.color]} alt={data.color} width={8} height={8} />

          {/* <Image src={`/public/assets/chip/${data.color}.svg`} alt={data.color} width={8} height={8} /> */}
          <p
            className={`text-18 ml-16 mr-6 tablet:text-16 tablet:ml-10 tablet:mr-4 mobile:hidden ${
              data.id === selectedDashboard && ' text-violet'
            }`}
          >
            {data.title}
          </p>
          {data.createdByMe && <Image src={crown} alt="crown" width={18} className="-translate-y-1 mobile:hidden" />}
        </div>
        // </Link>
      ))}
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={5}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex"
      /> */}
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="top-0 left-0 z-40 w-300 h-screen border-1 bg-white pt-20 px-24 tablet:w-160 mobile:w-67">
      <div className="w-109 mb-60 mobile:hidden">
        <Image src={logo} alt="logo" />
      </div>
      <div className="hidden tabelt:hidden mobile:block w-24 ">
        <Image src={mobileLogo} alt="mobile logo" />
      </div>
      <div className="flex justify-between">
        <p className="text-12 font-bold text-gray-78 mobile:hidden">Dash Boards</p>
        {/* <div className="w-20 mobile:mt-39 mobile:mb-22" onClick={handleOpenModal}> 대시보드 생성하기 모달 핸들러 추가 */}
        <div className="w-20 mobile:mt-39 mobile:mb-22">
          <Image src={add} alt="add dash board" />
        </div>
      </div>
      <DashboardList />
    </div>
  );
};

export default SideBar;
