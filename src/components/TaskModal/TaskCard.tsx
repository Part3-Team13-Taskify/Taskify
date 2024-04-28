import Image from 'next/image';
import { format } from 'date-fns';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import instance from '@/src/util/axios';
import useModal from '@/src/hooks/useModal';
import more from '@/public/assets/icon/moreVert.svg';
import exit from '@/public/assets/icon/close.svg';
import defaultProfile from '@/public/assets/chip/ellipseDefault.svg';
import Modal from '../common/modal';
import Chip from '../common/chip';
import ModalPortal from '../common/modalPortal';
import EditTask from './EditTask';
import Comments from './Comments';

interface ModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

interface TaskModalProps extends ModalProps {
  cardId: number;
  columnName: string;
}

export interface TaskData {
  assignee?: {
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

  const {
    openModal: editTaskModal,
    handleModalClose: editTaskModalClose,
    handleModalOpen: editTaskModalOpen,
  } = useModal();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const handleDropdownOpen: MouseEventHandler<HTMLButtonElement> = () => setIsDropdownOpen(true);
  const handleEditClick: MouseEventHandler<HTMLButtonElement> = () => {
    editTaskModalOpen();
    setIsDropdownOpen(false);
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

  if (!isPending && cardData)
    return (
      <Modal
        className="flex-shrink-0 max-h-910 h-vh overflow-y-auto"
        openModal={openModal}
        handleModalClose={handleModalClose}
      >
        <div className="flex flex-row mobile:flex-col-reverse justify-between">
          <div className="text-24 font-semibold">{cardData?.title}</div>
          <div className="flex justify-end gap-24">
            <ModalPortal>
              <EditTask cardData={cardData} openModal={editTaskModal} handleModalClose={editTaskModalClose} />
            </ModalPortal>
            {isDropdownOpen && (
              <div
                className="flex flex-col absolute border-1 rounded-6 p-6 text-14 font-normal bg-white top-65 right-95"
                ref={dropdownRef}
              >
                <button className="px-16 py-4 rounded-6 hover:text-violet hover:bg-violet-8%" onClick={handleEditClick}>
                  수정
                </button>
                <button className="px-16 py-4 rounded-6 hover:text-violet hover:bg-violet-8%">삭제</button>
              </div>
            )}
            <button onClick={handleDropdownOpen}>
              <Image src={more} alt="more" />
            </button>
            <button onClick={handleModalClose}>
              <Image src={exit} alt="exit" />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-24 mobile:gap-16 mobile:flex-col-reverse">
          <div className="flex flex-col gap-16 max-w-450 w-full mt-12">
            <div className="flex flex-row flex-wrap gap-12">
              <div className="h-26">
                <Chip dot>{columnName}</Chip>
              </div>
              {!!cardData?.tags?.length && (
                <div className="flex flex-row flex-wrap gap-6 border-l-1 overflow-auto border-gray-d9 pl-12">
                  {cardData.tags.map((tag) => {
                    return <Chip>{tag}</Chip>;
                  })}
                </div>
              )}
            </div>
            <p className="text-14 font-normal">{cardData?.description}</p>
            {!!cardData.imageUrl && (
              <Image src={cardData.imageUrl} width={700} height={700} alt="Task Image" className="rounded-6" />
            )}
            {!!cardData.id && (
              <Comments cardId={cardId} columnId={cardData.columnId} dashboardId={cardData.dashboardId} />
            )}
          </div>
          {(!!cardData?.assignee || !!cardData?.dueDate) && (
            <div className="flex flex-col mobile:flex-row gap-10 border-1 border-gray-d9 rounded-8 max-w-200 mobile:max-w-none w-full max-h-160 p-16 min-w-180 my-16">
              {!!cardData?.assignee && (
                <div className="flex flex-col gap-6 mobile:w-1/2">
                  <span className="text-12 font-semibold">담당자</span>
                  <div className="flex flex-row justify-start content-center gap-8">
                    <Image
                      src={cardData?.assignee?.profileImageUrl || defaultProfile}
                      width={34}
                      height={34}
                      alt="profile"
                      className="rounded-full"
                    />
                    <span className="text-14 font-normal content-center">{cardData?.assignee?.nickname}</span>
                  </div>
                </div>
              )}
              {!!cardData?.dueDate && (
                <div className="flex flex-col gap-6 mobile:w-1/2">
                  <span className="text-12 font-semibold">마감일</span>
                  <span className="text-14 font-normal">{dueDate}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    );
  return null;
};
