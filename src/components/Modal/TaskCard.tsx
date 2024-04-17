import Image from 'next/image';
import Reply from '../Reply';

export const TaskCard = () => {
  const nickname = '정만철';
  const date = '2024-04-16T06:28:59.964Z';
  const replyContent = '오늘안에 CCC 까지 만들 수 있을까요?';
  const profile = 'assets/chip/ellipseBlueLarge.svg';

  return (
    <div className="px-28 py-32 w-full flex-shrink-0">
      <div className="grid text-24 font-bold grid-cols-2 grid-rows-2 sm:grid-rows-none justify-between">
        <div className="row-start-2 col-start-1 sm:row-start-1">새로운 일정 Taskify</div>
        <div className="flex justify-end gap-24 row-start-1 col-start-2">
          <button>
            <Image src="assets/icon/moreVert.svg" width={28} height={28} alt="more" />
          </button>
          <button>
            <Image src="assets/icon/close.svg" width={28} height={28} alt="exit" />
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-32">
        <div className="flex flex-col gap-16 max-w-450">
          <div className="flex flex-row gap-12">
            <Image
              src="assets/card/exampleChip/chip/todoLarge.svg"
              width={39}
              height={12}
              alt="todo"
              className="w-auto"
            />
            <div className="flex flex-row gap-6 border-l-1 border-gray-d9 pl-12">
              <Image src="assets/card/exampleChip/large1.svg" width={44} height={22} alt="chip" className="w-auto" />
              <Image src="assets/card/exampleChip/large3.svg" width={44} height={22} alt="chip" className="w-auto" />
            </div>
          </div>
          <p className="text-14 font-normal ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante
            cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at
            leo.
          </p>
          <Image src="assets/card/desktop/card_image1.svg" width={450} height={263} alt="Task Image" />
          <div className="gap-24">
            <div className="flex flex-col">
              <label htmlFor="reply" className="my-10">
                댓글
              </label>
              <input
                id="reply"
                type="text"
                className="p-16 border-1 border-gray-d9 rounded-6 h-78"
                placeholder="댓글 작성하기"
              ></input>
            </div>
          </div>
          <Reply nickname={nickname} profile={profile} date={date} content={replyContent} />
        </div>
        <div className="flex flex-col gap-6 border-1 border-gray-d9 rounded-8 w-200 max-h-160 p-16 min-w-180 my-16">
          <span className="text-12 font-semibold">담당자</span>
          <div className="flex flex-row justify-start content-center gap-8">
            <Image
              src="assets/chip/ellipseBlueLarge.svg"
              width={34}
              height={34}
              alt="profile"
              className="rounded-full"
            />
            <span className="text-14 font-normal content-center">메뉴얼</span>
          </div>
          <span className="text-12 font-semibold">마감일</span>
          <span className="text-14 font-normal">2022.12.30 19:00</span>
        </div>
      </div>
    </div>
  );
};
