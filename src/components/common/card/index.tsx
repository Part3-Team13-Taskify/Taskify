import { FormatDate } from '@/src/util/dateFormat';
import Image from 'next/image';
import Chip from '../chip';
import { useCardId } from '@/src/util/zustand';
import { MouseEventHandler } from 'react';
import useModal from '@/src/hooks/useModal';
/**
 * 카드 컴포넌트
 * @param src: 이미지 주소
 * @param title: 제목 30자 이상 시 말줄임표
 * @param date: 날짜 별도의 변환 없이 string 형식으로 입력
 */
const Card = ({
  id,
  src,
  title,
  date,
  profile,
  tags,
  onClick,
}: {
  id: number;
  src?: string;
  title: string;
  date?: string;
  profile?: string;
  tags: string[] | [];
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const setCardId = useCardId((state) => state.setCardId);
  const titleShort = title.length > 30 ? title.slice(0, 29) + '...' : title;
  const formattedDate = date ? FormatDate(date) : undefined;

  const handleCardClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setCardId(id);
    onClick(e);
  };

  return (
    <button
      onClick={handleCardClick}
      className="text-left max-w-450 md:max-w-full xl:max-w-450 rounded-6 py-16 px-16 border-1 border-gray-d9 bg-white hover:border-violet"
    >
      <div className="flex flex-col md:flex-row xl:flex-col justify:start gap-12">
        {!!src && (
          <Image
            src={src}
            width={450}
            height={262}
            alt="Card Image"
            className="rounded-6 w-full md:w-90 xl:w-full h-auto"
          />
        )}
        <div className="w-full flex flex-col gap-10">
          <span className="text-black font-medium">{titleShort}</span>
          <div className="flex flex-col md:flex-row xl:flex-col gap-16 overflow-auto">
            {tags.length !== 0 && (
              <div className="flex flex-row flex-none justify-start gap-6">
                {tags.map((tag) => {
                  return <Chip>{tag}</Chip>;
                })}
              </div>
            )}
            <div className="flex flex-row justify-between content-center w-full">
              {!!formattedDate && (
                <div className="flex flex-row gap-6">
                  <Image src="/assets/icon/calendar.svg" width={18} height={18} alt="date" className="inline-block" />
                  <span className="font-medium text-gray-78">{formattedDate}</span>
                </div>
              )}
              {!!profile && <Image src={profile} width={24} height={24} alt="profileImg" />}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Card;
