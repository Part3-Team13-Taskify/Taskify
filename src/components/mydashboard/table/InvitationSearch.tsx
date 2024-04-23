import search from '@/public/assets/icon/search.svg';
import Image from 'next/image';

const InvitationSearch = () => {
  return (
    <div className="mt-20 mx-28">
      <form action="" className="flex px-16 py-8 gap-8 h-40 rounded-6 outline outline-1 outline-gray-d9">
        <Image src={search} alt="search" />
        <input type="text" placeholder="검색하기" />
      </form>
    </div>
  );
};

export default InvitationSearch;
