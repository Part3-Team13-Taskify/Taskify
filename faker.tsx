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

// GET
// /{teamId}/cards
// 카드 목록 조회
// {
//   "cursorId": 0,
//   "totalCount": 0,
//   "cards": [
//     {
//       "id": 0,
//       "title": "string",
//       "description": "string",
//       "tags": [
//         "string"
//       ],
//       "dueDate": "string",
//       "assignee": {
//         "profileImageUrl": "string",
//         "nickname": "string",
//         "id": 0
//       },
//       "imageUrl": "string",
//       "teamId": "string",
//       "columnId": 0,
//       "createdAt": "2024-04-19T07:25:27.987Z",
//       "updatedAt": "2024-04-19T07:25:27.987Z"
//     }
//   ]
// }

type Card = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: Date;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
};

export function createRandomCard(): Card {
  return {
    id: faker.datatype.number(),
    title: faker.internet.userName(),
    description: faker.lorem.lines(),
    tags: faker.random.words().split(' '),

    dueDate: faker.date.future(),
    assignee: {
      profileImageUrl: faker.image.avatar(),
      nickname: faker.internet.userName(),
      id: faker.datatype.number(),
    },
    imageUrl: faker.image.avatar(),
    teamId: faker.internet.userName(),
    columnId: faker.datatype.number(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

export const CARDS: Card[] = faker.helpers.multiple(createRandomCard, {
  count: 5,
});

// GET
// /{teamId}/columns
// 컬럼 목록 조회
// {
//   "result": "SUCCESS",
//   "data": [
//     {
//       "id": 0,
//       "title": "string",
//       "teamId": "string",
//       "createdAt": "2024-04-19T07:40:31.091Z",
//       "updatedAt": "2024-04-19T07:40:31.091Z"
//     }
//   ]
// }

type Column = {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
};

export function createRandoColumn(): Column {
  return {
    id: faker.datatype.number(),
    title: faker.internet.userName(),
    teamId: faker.internet.userName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

export const COLUMNS: Column[] = faker.helpers.multiple(createRandoColumn, {
  count: 5,
});
