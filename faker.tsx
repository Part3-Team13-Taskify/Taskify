import { faker } from '@faker-js/faker';
// GET
// /{teamId}/dashboards
// 대시보드 목록 조회
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
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
  userId: number;
};

export const COLORS: string[] = ['green', 'blue', 'pink', 'purple', 'orange'];

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
}

// import 하는 파일에서 아래 코드 사용
// interface ColorSources {
//   [key: string]: string;
//   green: string;
//   blue: string;
//   pink: string;
//   purple: string;
//   orange: string;
// }

// const colorSources: ColorSources = {
//   green,
//   blue,
//   pink,
//   purple,
//   orange: yellow,
// };

export function createRandomDashboard(): Dashboard {
  return {
    id: faker.datatype.number(),
    title: faker.internet.userName(),
    color: getRandomColor(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    createdByMe: faker.datatype.boolean(),
    userId: faker.datatype.number(),
  };
}

export const DASHBOARDS: Dashboard[] = faker.helpers.multiple(createRandomDashboard, {
  count: 15,
});
