import instance from '@/src/util/axios';
import Card from '../../common/card';
import { useEffect, useState } from 'react';
import ModalPortal from '../../common/modalPortal';
import { TaskCard } from '../../TaskModal/TaskCard';
import useModal from '@/src/hooks/useModal';
import { useCardId } from '@/src/util/zustand';

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

interface CardList {
  cards: CardType[] | [];
  totalCount: number;
  cursorId: number | null;
}

const CardList = ({ columnId, title }: { columnId: number; title: string }) => {
  const [cardList, setCards] = useState<CardList>();

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
          <>
            <Card
              key={card.id}
              id={card.id}
              src={card.imageUrl}
              profile={card.assignee?.profileImageUrl}
              title={title}
              date={card.dueDate}
              tags={card.tags}
              onClick={TaskModalOpen}
            ></Card>
          </>
        );
      })}
    </>
  );
};

export default CardList;
