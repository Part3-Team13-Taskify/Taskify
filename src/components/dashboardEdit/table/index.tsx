// import { faker } from '@faker-js/faker';
import { ReactNode } from 'react';
// [teamId]/memebers
//   "members": [
//     {
//       "id": 0,
//       "userId": 0,
//       "email": "string",
//       "nickname": "string",
//       "profileImageUrl": "string",
//       "createdAt": "2024-04-17T11:46:46.994Z",
//       "updatedAt": "2024-04-17T11:46:46.994Z",
//       "isOwner": true
//     }
//   ],
//   "totalCount": 0
// }

// export function createRandomUser(): User {
//   return {
//     userId: faker.string.uuid(),
//     nickname: faker.internet.userName(),
//     email: faker.internet.email(),
//     profileImageUrl: faker.image.avatar(),
//   };
// }

// export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
//   count: 5,
// });

interface TableProps {
  label: string;
  children: ReactNode;
}

const Table = ({ label, children }: TableProps) => {
  return (
    <div className="flex flex-col">
      <p className="px-28 mb-16 text-gray-9f">{label}</p>
      {children}
    </div>
  );
};

export default Table;
