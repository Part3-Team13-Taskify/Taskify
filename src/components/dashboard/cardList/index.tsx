import { useEffect, useRef, useState } from 'react';
import { useCardId, useCardListStore } from '@/src/util/zustand';
import useModal from '@/src/hooks/useModal';
import { getCardList, getCardListAdditional } from '@/src/pages/api/cardListApi';
import Card from '../../common/card';
import ModalPortal from '../../common/modalPortal';
import { TaskCard } from '../../TaskModal/TaskCard';

const CardList = ({ columnId, title }: { columnId: number; title: string }) => {
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const { openModal: taskModal, handleModalClose: TaskModalClose, handleModalOpen: TaskModalOpen } = useModal();
  const cardId = useCardId((state) => state.cardId);
  const { cardLists, setCardList } = useCardListStore();
  const cardList = cardLists[columnId] || { cards: [], totalCount: 0, cursorId: null };

  // 카드리스트 불러오기
  const getCards = async () => {
    try {
      const response = await getCardList({ column: columnId });
      const cardsData = response.cards;

      const newCardList = {
        cards: [...cardList.cards, ...cardsData],
        totalCount: response.totalCount,
        cursorId: response.cursorId,
      };

      setCardList(columnId, newCardList);
      setHasMoreItems(cardsData.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  // 추가적으로 카드리스트 불러오기
  const getCardsAdditional = async () => {
    if (cardList.cursorId) {
      try {
        const response = await getCardListAdditional({ column: columnId, targetId: cardList.cursorId });
        const cardsData = response.cards;

        const newCardList = {
          cards: [...cardList.cards, ...cardsData],
          totalCount: response.totalCount,
          cursorId: response.cursorId,
        };
        setCardList(columnId, newCardList);
        setHasMoreItems(cardsData.length > 0);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  // 무한스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMoreItems) {
            getCardsAdditional();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [cardList.cursorId, hasMoreItems]);

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
      <div ref={observerRef} />
    </>
  );
};

export default CardList;
