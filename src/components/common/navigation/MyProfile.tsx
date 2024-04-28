import Image from 'next/image';
import InitialImage from './InitialImage';

export type MyProfileProps = {
  nickname: string;
  src?: string;
};

const MyProfile = ({ nickname, src }: MyProfileProps) => {
  return (
    <div className="flex gap-12 items-center">
      {src ? (
        <div className="w-30 h-30 rounded-99 overflow-hidden">
          <Image src={src} alt="last name initial" width={30} height={30} className="rounded-99 border-2" />
        </div>
      ) : (
        <InitialImage nickname={nickname} />
      )}
      {nickname && <p className="mobile:hidden">{nickname}</p>}
    </div>
  );
};

export default MyProfile;
