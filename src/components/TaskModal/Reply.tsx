import { format } from 'date-fns';
import Image from 'next/image';

interface Props {
  nickname: string;
  profile: string;
  date: string;
  content: string;
}

const Reply = ({ nickname: name, profile, date, content: replyContent }: Props) => {
  const formattedDate = format(new Date(date), 'yyyy.MM.dd HH:mm');
  return (
    <div className="flex flex-row gap-8">
      <div>
        <Image src={profile} width={34} height={34} alt="profile" className="content-center rounded-99" />
      </div>
      <div>
        <div className="flex flex-row gap-8">
          <div className="text-14 font-semibold">{name}</div>
          <div className="text-12 font-normal text-gray-9f">{formattedDate}</div>
        </div>
        <div className="text-14 font-normal">{replyContent}</div>
        <div className="flex flex-row gap-12 text-12 text-gray-9f">
          <div className="underline">수정</div>
          <div className="underline">삭제</div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
