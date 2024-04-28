import instance from '@/src/util/axios';
import { format } from 'date-fns';
import Image from 'next/image';
import { ChangeEventHandler, useState } from 'react';

interface Props {
  nickname: string;
  profile: string;
  date: string;
  content: string;
}

const Reply = ({ nickname: name, profile, date, content: replyContent }: Props) => {
  const formattedDate = format(new Date(date), 'yyyy.MM.dd HH:mm');
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>(replyContent);

  // const deleteComment = async () => {
  //   await instance.delete(`comments/`);
  // };

  const handleEditCommentClick = () => {
    setIsEditting(true);
  };
  const handleEditCancel = () => {
    setIsEditting(false);
    setReplyValue(replyContent);
  };
  const handleReplyChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReplyValue(e.target.value.trim());
  };

  return (
    <div className="flex flex-row gap-8 w-full">
      <div>
        <Image src={profile} width={34} height={34} alt="profile" className="content-center rounded-99" />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-8">
          <div className="text-14 font-semibold">{name}</div>
          <div className="text-12 font-normal text-gray-9f">{formattedDate}</div>
        </div>
        {isEditting ? (
          <div className="relative w-full">
            <textarea className="w-full resize-none" value={replyValue} onChange={handleReplyChange} />
            <div className="flex flex-row gap-4 absolute bottom-12 right-12 ">
              <button
                className="text-12 border rounded-6 border-gray-df px-31 py-6 bg-white text-black"
                onClick={handleEditCancel}
              >
                취소
              </button>
              <button
                className={`text-12 border rounded-6 border-gray-df px-31 py-6 ${
                  replyContent ? 'bg-white text-violet' : 'bg-gray-50 text-gray-78'
                }`}
              >
                수정
              </button>
            </div>
          </div>
        ) : (
          <div className="text-14 font-normal">{replyContent}</div>
        )}
        <div className="flex flex-row gap-12 text-12 text-gray-9f">
          <button className="underline" onClick={handleEditCommentClick}>
            수정
          </button>
          <button className="underline">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default Reply;
