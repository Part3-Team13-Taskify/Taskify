import { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react';
import instance from '@/src/util/axios';
import { postComment } from '@/src/util/comments';
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

type CommentList = CommentData[] | [];

interface IdData {
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const Comments = ({ cardId, columnId, dashboardId }: IdData) => {
  const [commentList, setCommentList] = useState<CommentList>([]);
  const [replyValue, setReplyValue] = useState('');
  const [cursorId, setCursorId] = useState<number | null>(null);
  const isReplyWritten = replyValue.trim() !== '';
  const lastCommentRef = useRef<HTMLDivElement>(null);

  const getInitialComments = async (id: number) => {
    const response = await instance.get(`comments?size=10&cardId=${id}`);
    setCommentList(response.data.comments);
    setCursorId(response.data.cursorId);
  };
  const getAdditionalComments = async (id: number, cursor: number) => {
    const response = await instance.get(`comments?size=10&cursorId=${cursor}&cardId=${id}`);
    setCursorId(response.data.cursorId);
    setCommentList((prev) => {
      return [...prev, ...response.data.comments];
    });
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReplyValue(e.target.value);
  };
  const handleReplyClick: MouseEventHandler<HTMLButtonElement> = async () => {
    const commentData = {
      content: replyValue,
      cardId: cardId,
      columnId: columnId,
      dashboardId: dashboardId,
    };
    const response = await postComment(commentData);
    if (response.status === 201) {
      setReplyValue('');
      await getInitialComments(cardId);
    }
  };
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && cursorId) {
      getAdditionalComments(cardId, cursorId);
    }
  };

  useEffect(() => {
    getInitialComments(cardId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    if (lastCommentRef.current) {
      observer.observe(lastCommentRef.current);
    }
    return () => {
      if (lastCommentRef.current) {
        observer.unobserve(lastCommentRef.current);
      }
    };
  }, [cursorId]);

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
        {commentList.map((comment) => (
          <Reply
            id={comment.id}
            key={comment.id}
            nickname={comment.author.nickname}
            profile={comment.author.profileImageUrl}
            date={comment.createdAt}
            content={comment.content}
          />
        ))}
      </div>
      <div id="observer" ref={lastCommentRef} />
    </>
  );
};

export default Comments;
