import Image from 'next/image';

export type MyProfileProps = {
  nickname: string;
  src?: string;
};

const MyProfile = ({ nickname, src }: MyProfileProps) => {
  return (
    <div className="flex gap-12 items-center">
      {src && <Image src={src} alt="last name initial" width={30} height={30} className="rounded-99" />}
      <p className="mobile:hidden">{nickname}</p>
    </div>
  );
};

export default MyProfile;
