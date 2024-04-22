import Image from 'next/image';
import setting from '@/public/assets/icon/setting.svg';
import green from '@/public/assets/chip/ellipseGreenLarge.svg';
import blue from '@/public/assets/chip/ellipseBlueLarge.svg';
import pink from '@/public/assets/chip/ellipsePinkLarge.svg';
import purple from '@/public/assets/chip/ellipsePurpleLarge.svg';
import yellow from '@/public/assets/chip/ellipseYellowLarge.svg';
import addLarge from '@/public/assets/chip/addLarge.svg';
import Button from '@/src/components/common/button';

const MOCK_DATA = [
  {
    cursorId: 0,
    totalCount: 0,
    dashboards: [
      {
        id: 0,
        title: 'To Do',
        color: blue,
        createdAt: '2024-04-17T14:30:44.396Z',
        updatedAt: '2024-04-17T14:30:44.396Z',
        createdByMe: true,
        userId: 0,
      },
    ],
  },
  {
    cursorId: 1,
    totalCount: 2,
    dashboards: [
      {
        id: 1,
        title: 'On Progress',
        color: yellow,
        createdAt: '2024-04-17T14:30:44.396Z',
        updatedAt: '2024-04-17T14:30:44.396Z',
        createdByMe: true,
        userId: 0,
      },
    ],
  },
  {
    cursorId: 2,
    totalCount: 1,
    dashboards: [
      {
        id: 2,
        title: 'Done',
        color: green,
        createdAt: '2024-04-17T14:30:44.396Z',
        updatedAt: '2024-04-17T14:30:44.396Z',
        createdByMe: true,
        userId: 0,
      },
    ],
  },
  {
    cursorId: 3,
    totalCount: 1,
    dashboards: [
      {
        id: 3,
        title: '뭐먹지',
        color: pink,
        createdAt: '2024-04-17T14:30:44.396Z',
        updatedAt: '2024-04-17T14:30:44.396Z',
        createdByMe: true,
        userId: 0,
      },
    ],
  },
  {
    cursorId: 4,
    totalCount: 3,
    dashboards: [
      {
        id: 4,
        title: '컵밥',
        color: purple,
        createdAt: '2024-04-17T14:30:44.396Z',
        updatedAt: '2024-04-17T14:30:44.396Z',
        createdByMe: true,
        userId: 0,
      },
    ],
  },
];

const ColumnsList = () => {
  return (
    <div className="flex-1 w-screen h-screen ">
      <div className="flex w-full h-full overflow-scroll tablet:flex-col mobile:flex-col">
        {MOCK_DATA.map((dataGroup) =>
          dataGroup.dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="w-354 h-full p-20 border-solid border-1 border-gray-ee tablet:w-full mobile:w-full"
            >
              <div className="flex justify-between mb-25">
                <div className="flex justify-center items-center">
                  <Image src={dashboard.color} alt={dashboard.title} className="w-8 h-8 mr-8" />
                  <h3 className="text-18 font-bold mr-12 mobile:text-16">{dashboard.title}</h3>
                  <p className="flex justify-center items-center w-20 h-20 text-12 font-medium text-gray-78 bg-gray-ee rounded">
                    {dataGroup.totalCount}
                  </p>
                </div>
                <button>
                  <Image src={setting} alt="setting" />
                </button>
              </div>
              <div>
                <Button
                  className="tablet:w-full mobile:w-full"
                  buttonType="add"
                  bgColor="white"
                  textColor="black"
                  type="button"
                >
                  <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
                </Button>
              </div>
            </div>
          )),
        )}
        <div className="flex gap-12 pt-68 px-20 tablet:p-20 mobile:p-20">
          <Button buttonType="columnAdd" bgColor="white" textColor="black" type="button">
            새로운 컬럼추가
            <Image src={addLarge} alt="addBox" className="w-22 h-22 p-3 rounded bg-violet-8%" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ColumnsList;
