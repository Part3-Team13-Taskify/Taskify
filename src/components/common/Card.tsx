import { FormatDate } from '@/util/dateFormat';
import Image from 'next/image';

/**
 * 카드 컴포넌트
 * @param src: 이미지 주소
 * @param title: 제목 30자 이상 시 말줄임표
 * @param date: 날짜 별도의 변환 없이 string 형식으로 입력
 */
const Card = ({ src, title, date, profile }: { src?: string; title: string; date: string; profile: string }) => {
  const titleShort = title.length > 30 ? title.slice(0, 29) + '...' : title;
  const formattedDate = FormatDate(date);
  return (
    <div className="max-w-450 md:max-w-full xl:max-w-450 rounded-6 py-16 px-16 border-1 border-gray-d9 bg-white hover:border-violet">
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
            <div className="flex flex-row flex-none justify-start gap-6">
              <Image src="assets/card/exampleChip/large1.svg" width={44} height={22} alt="chip" className="w-auto" />
              <Image src="assets/card/exampleChip/large3.svg" width={44} height={22} alt="chip" className="w-auto" />
            </div>
            <div className="flex flex-row justify-between content-center w-full">
              <div className="flex flex-row gap-6">
                <Image src="assets/icon/calendar.svg" width={18} height={18} alt="date" className="inline-block" />
                <span className="font-medium text-gray-78">{formattedDate}</span>
              </div>
              <Image src={profile} width={24} height={24} alt="profileImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
