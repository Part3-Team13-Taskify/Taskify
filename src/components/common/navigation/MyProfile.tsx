import Image from 'next/image';

export type MyProfileProps = {
  nickname: string;
  src?: string;
};

const MyProfile = ({ nickname, src }: MyProfileProps) => {
  const initial = String(nickname[0]).toUpperCase();
  return (
    <div className="flex gap-12 items-center">
      {src ? (
        <Image src={src} alt="last name initial" width={30} height={30} className="rounded-99" />
      ) : (
        <div className="w-30 h-30 rounded-99 bg-blue-bg flex items-center justify-center text-blue">{initial}</div>
      )}
      {src && <Image src={src} alt="last name initial" width={30} height={30} className="rounded-99" />}
      {nickname && <p className="mobile:hidden">{nickname}</p>}
    </div>
  );
};

export default MyProfile;
