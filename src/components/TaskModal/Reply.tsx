import instance from '@/src/util/axios';
import { format } from 'date-fns';
import Image from 'next/image';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';

interface Props {
  id: number;
  nickname: string;
  profile: string;
  date: string;
  content: string;
}

const Reply = ({ id, nickname: name, profile, date, content: replyContent }: Props) => {
  const formattedDate = format(new Date(date), 'yyyy.MM.dd HH:mm');
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>(replyContent);

  const handleEditCommentClick = () => {
    setIsEditting(true);
  };
  const handleEditCancel = () => {
    setIsEditting(false);
    setReplyValue(replyContent);
  };
  const handleReplyChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReplyValue(e.target.value);
  };
  const putComment = async (content: string) => {
    const response = await instance.put(`comments/${id}`, { content: content });
    if (response.status === 200) {
      alert('성공적!');
      setIsEditting(false);
    } else if (response.status !== 500) {
      alert(response.data.message);
    } else {
      alert('연결 상태가 좋지 않습니다');
    }
  };
  const deleteComment = async () => {
    const response = await instance.delete(`comments/${id}`);
    if (response.status === 204) {
      return alert('삭제 성공적');
    }
    if (response.status === 403) {
      return alert(response.data.message);
    }
  };
  const handleEditSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    putComment(replyValue);
  };
  const handleCommentDelete: MouseEventHandler<HTMLButtonElement> = () => {
    deleteComment();
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
                    replyContent ? 'bg-white text-violet' : 'bg-gray-50 text-gray-78'
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
            <div className="text-14 font-normal">{replyContent}</div>
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
