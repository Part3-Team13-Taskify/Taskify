// import { faker } from '@faker-js/faker';
import Image from 'next/image';

import ellipse from '@/public/assets/chip/ellipseGreenLarge.svg';
import Button from '../../common/button';
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

const TableContent = () => {
  return (
    <div className="flex flex-col">
      <p className="px-28 mb-16">이름</p>
      <div className="flex items-center justify-between border-b-1 py-16">
        <div className="flex gap-12 items-center px-28">
          <Image src={ellipse} alt="last name initial" />
          정만철
        </div>
        <div className="px-28">
          <Button buttonType="delete" textColor="violet" bgColor="white">
            삭제
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-1 py-16">
        <div className="flex gap-12 items-center px-28">
          <Image src={ellipse} alt="last name initial" />
          정만철
        </div>
        <div className="px-28">
          <Button buttonType="delete" textColor="violet" bgColor="white">
            삭제
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-1 py-16">
        <div className="flex gap-12 items-center px-28">
          <Image src={ellipse} alt="last name initial" />
          정만철
        </div>
        <div className="px-28">
          <Button buttonType="delete" textColor="violet" bgColor="white">
            삭제
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between border-b-1 py-16">
        <div className="flex gap-12 items-center px-28">
          <Image src={ellipse} alt="last name initial" />
          정만철
        </div>
        <div className="px-28">
          <Button buttonType="delete" textColor="violet" bgColor="white">
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

const Table = () => {
  return <TableContent />;
};

export default Table;
