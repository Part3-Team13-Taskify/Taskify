import instance from '@/src/util/axios';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import Reply from './Reply';

interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
}
interface CommentResponse {
  comments: CommentData[];
  cursorId: number | null;
}

interface IdData {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const Comments = ({ cardId, columnId, dashboardId }: IdData) => {
  const [commentList, setCommentList] = useState<CommentResponse>({ comments: [], cursorId: null });
  const [replyValue, setReplyValue] = useState('');
  const isReplyWritten = replyValue.trim() !== '';

  const getComments = async (id: number) => {
    const response = await instance.get(`comments?cardId=${id}`);
    setCommentList(response.data);
  };
  const postComment = async (card: number, column: number, dashboard: number) => {
    const response = await instance.post(`comments`, {
      content: replyValue,
      cardId: card,
      columnId: column,
      dashboardId: dashboard,
    });
    if (response.status === 201) {
      setReplyValue('');
      getComments(cardId);
    }
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReplyValue(e.target.value);
  };
  const handleReplyClick: MouseEventHandler<HTMLButtonElement> = () => {
    postComment(cardId, columnId, dashboardId);
  };

  useEffect(() => {
    getComments(cardId);
  }, []);

  return (
    <>
      <div className="gap-24">
        <div className="flex flex-col relative">
          <label htmlFor="reply" className="my-10">
            댓글
          </label>
          <textarea
            id="reply"
            className="p-16 border-1 border-gray-d9 rounded-6 h-110 text-14 resize-none"
            placeholder="댓글 작성하기"
            value={replyValue}
            onChange={handleTextChange}
          />
          <button
            className={`absolute bottom-12 right-12 text-12 border rounded-6 border-gray-df px-31 py-6 ${
              isReplyWritten ? 'bg-white text-violet' : 'bg-gray-50 text-gray-78'
            }`}
            disabled={!isReplyWritten}
            onClick={handleReplyClick}
          >
            입력
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-20">
        {commentList.comments.map((comment) => (
          <Reply
            key={comment.id}
            nickname={comment.author.nickname}
            profile={comment.author.profileImageUrl}
            date={comment.createdAt}
            content={comment.content}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
