import instance from '@/src/util/axios';
import useModal from '@/src/hooks/useModal';
import { useEffect, useState } from 'react';
import { useCardId } from '@/src/util/zustand';
import Card from '../../common/card';
import ModalPortal from '../../common/modalPortal';
import { TaskCard } from '../../TaskModal/TaskCard';

export interface CardType {
  id: number;
  title: string;
  description: string;
  tags: string[] | [];
  dueDate?: string;
  assignee?: { id: number; nickname: string; profileImageUrl?: string };
  imageUrl?: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface CardListType {
  cards: CardType[] | [];
  totalCount: number;
  cursorId: number | null;
}

const CardList = ({ columnId, title }: { columnId: number; title: string }) => {
  const [cardList, setCards] = useState<CardListType>();

  const getCardList = async () => {
    const response = await instance.get(`cards?columnId=${columnId}`);
    setCards(response.data);
  };
  const { openModal: taskModal, handleModalClose: TaskModalClose, handleModalOpen: TaskModalOpen } = useModal();
  const cardId = useCardId((state) => state.cardId);

  useEffect(() => {
    getCardList();
  }, [columnId]);

  return (
    <>
      <ModalPortal>
        <TaskCard cardId={cardId} columnName={title} openModal={taskModal} handleModalClose={TaskModalClose} />
      </ModalPortal>
      {cardList?.cards.map((card) => {
        return (
          <Card
            key={card.id}
            id={card.id}
            src={card.imageUrl}
            profile={card.assignee?.profileImageUrl}
            title={title}
            date={card.dueDate}
            tags={card.tags}
            onClick={TaskModalOpen}
          />
        );
      })}
    </>
  );
};

export default CardList;
