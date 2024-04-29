import { deleteComment, putComment } from '@/src/pages/api/comments';
import { format } from 'date-fns';
import Image from 'next/image';
import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';

interface Props {
  id: number;
  nickname: string;
  profile?: string;
  date: string;
  content: string;
  currentEditing: number;
  setCurrentEditing: Dispatch<SetStateAction<number>>;
  setIsCommentFormatted: Dispatch<SetStateAction<boolean>>;
}

const Reply = ({
  id,
  nickname: name,
  profile,
  date,
  content,
  currentEditing,
  setCurrentEditing,
  setIsCommentFormatted,
}: Props) => {
  const formattedDate = format(new Date(date), 'yyyy.MM.dd HH:mm');
  const [replyValue, setReplyValue] = useState<string>(content);

  const handleEditCommentClick = () => {
    setCurrentEditing(id);
  };
  const handleEditCancel = () => {
    setCurrentEditing(0);
    setReplyValue(content);
  };
  const handleReplyChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReplyValue(e.target.value);
  };
  const handleEditSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    putComment(id, replyValue);
    setCurrentEditing(0);
    setIsCommentFormatted(true);
  };
  const handleCommentDelete: MouseEventHandler<HTMLButtonElement> = () => {
    deleteComment(id);
    setIsCommentFormatted(true);
  };

  return (
    <div className="flex flex-row gap-8 w-full">
      {!!profile && (
        <div>
          <Image src={profile} width={34} height={34} alt="profile" className="content-center rounded-99" />
        </div>
      )}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-8">
          <div className="text-14 font-semibold">{name}</div>
          <div className="text-12 font-normal text-gray-9f">{formattedDate}</div>
        </div>
        {currentEditing === id ? (
          <div className="w-full">
            <div className="w-full max-h-160 h-fit p-16 border-1 border-gray-d9 rounded-6 focus-within:border-violet">
              <textarea
                className="resize-none outline-none w-full h-full"
                value={replyValue}
                onChange={handleReplyChange}
              />
              <div className="flex flex-row justify-end gap-4 mt-4">
                <button
                  className="text-12 border rounded-6 border-gray-df px-31 py-6 bg-white text-black"
                  onClick={handleEditCancel}
                >
                  취소
                </button>
                <button
                  className={`text-12 border rounded-6 border-gray-df px-31 py-6 ${
                    content ? 'bg-white text-violet' : 'bg-gray-50 text-gray-78'
                  }`}
                  onClick={handleEditSubmit}
                >
                  수정
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-14 font-normal">{content}</div>
            <div className="flex flex-row gap-12 text-12 text-gray-9f">
              <button className="underline" onClick={handleEditCommentClick}>
                수정
              </button>
              <button className="underline" onClick={handleCommentDelete}>
                삭제
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reply;
