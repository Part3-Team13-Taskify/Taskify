import instance from '@/src/util/axios';
import Card from '../../common/card';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    getCardList();
  }, [columnId]);
  console.log(cardList);

  return (
    <>
      {cardList?.cards.map((card) => {
        return (
          <>
            <Card
              src={card.imageUrl}
              profile={card.assignee?.profileImageUrl}
              title={title}
              date={card.dueDate}
              tags={card.tags}
            ></Card>
          </>
        );
      })}
    </>
  );
};

export default CardList;
