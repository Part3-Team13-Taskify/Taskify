import Image from 'next/image';
import Reply from './Reply';

import taskData from '@/public/mock/TaskCard.json';
import comments from '@/public/mock/Comment.json';
import { format } from 'date-fns';
import { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react';
import Modal from '../common/modal';
import instance from '@/src/util/axios';
import Chip from '../common/chip';

interface ModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

interface TaskModalProps extends ModalProps {
  cardId: number;
  columnName: string;
}

interface TaskData {
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
  columnId: number;
  createdAt: string;
  dashboardId: number;
  description: string;
  dueDate?: string;
  id: number;
  imageUrl?: string;
  tags?: string[];
  teamId: string;
  title: string;
  updatedAt: string;
}

export const TaskCard = ({ openModal, handleModalClose, cardId, columnName }: TaskModalProps) => {
  if (!openModal) {
    return null;
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [replyValue, setReplyValue] = useState('');
  const [cardData, setCardData] = useState<TaskData>();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const response = await instance.get(`cards/${cardId}`);
        setCardData(response.data);
      } catch {
        console.log('error');
      } finally {
        setIsPending(false);
      }
    };
    getTaskData();
  }, []);

  const dueDate = cardData?.dueDate ? format(new Date(cardData.dueDate).toLocaleString('en-US'), 'yyyy.MM.dd') : '';
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick: MouseEventHandler<HTMLButtonElement> = () => setIsDropdownOpen(true);
  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReplyValue(e.target.value.trim());
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  console.log(cardData);

  if (!isPending)
    return (
      <Modal className="flex-shrink-0" openModal={openModal} handleModalClose={handleModalClose}>
        <div className="grid grid-cols-2 grid-rows-2 sm:grid-rows-none justify-between">
          <div className="row-start-2 col-start-1 sm:row-start-1 text-24 font-semibold">{cardData?.title}</div>
          <div className="flex justify-end gap-24 row-start-1 col-start-2">
            {isDropdownOpen && (
              <div
                className="flex flex-col absolute border-1 rounded-6 p-6 text-14 font-normal bg-white top-65 right-95"
                ref={dropdownRef}
              >
                <button className="px-16 py-4 rounded-6 hover:text-violet hover:bg-violet-8%">수정</button>
                <button className="px-16 py-4 rounded-6 hover:text-violet hover:bg-violet-8%">삭제</button>
              </div>
            )}
            <button onClick={handleDropdownClick}>
              <Image src="assets/icon/moreVert.svg" width={28} height={28} alt="more" />
            </button>
            <button onClick={handleModalClose}>
              <Image src="assets/icon/close.svg" width={28} height={28} alt="exit" />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-32">
          <div className="flex flex-col gap-16 max-w-450 mt-12">
            <div className="flex flex-row gap-12">
              <Chip dot={true}>{columnName}</Chip>
              <div className="flex flex-row gap-6 border-l-1 border-gray-d9 pl-12">
                <Chip color="orange">프로젝트</Chip>
                <Chip color="pink">백엔드</Chip>
              </div>
            </div>
            <p className="text-14 font-normal ">{cardData?.description}</p>
            <Image src="assets/card/desktop/card_image1.svg" width={450} height={263} alt="Task Image" />
            <div className="gap-24">
              <div className="flex flex-col relative">
                <label htmlFor="reply" className="my-10">
                  댓글
                </label>
                <textarea
                  id="reply"
                  className="p-16 border-1 border-gray-d9 rounded-6 h-110 text-14 resize-none"
                  placeholder="댓글 작성하기"
                  onChange={handleTextChange}
                ></textarea>
                <button
                  className={`absolute bottom-12 right-12 border rounded-6 border-gray-df px-31 py-6 ${
                    replyValue ? 'bg-white text-violet' : 'bg-gray-50 text-gray-78'
                  }`}
                  disabled={!replyValue}
                >
                  입력
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-20">
              {comments.comments.map((comment) => (
                <Reply
                  key={comment.id}
                  nickname={comment.author.nickname}
                  profile={comment.author.profileImageUrl}
                  date={comment.createdAt}
                  content={comment.content}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 border-1 border-gray-d9 rounded-8 w-200 max-h-160 p-16 min-w-180 my-16">
            <span className="text-12 font-semibold">담당자</span>
            <div className="flex flex-row justify-start content-center gap-8">
              <Image
                src={cardData?.assignee.profileImageUrl || 'assets/chip/ellipseDefault.svg'}
                width={34}
                height={34}
                alt="profile"
                className="rounded-full"
              />
              <span className="text-14 font-normal content-center">{cardData?.assignee.nickname}</span>
            </div>
            {!!cardData?.dueDate && (
              <>
                <span className="text-12 font-semibold">마감일</span>
                <span className="text-14 font-normal">{dueDate}</span>
              </>
            )}
          </div>
        </div>
      </Modal>
    );
};
