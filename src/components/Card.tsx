import Image from 'next/image';

export const Card = () => {
  return (
    <>
      <div className="flex flex-col max-w-450 rounded-6 py-20 px-20 m-10 border-1 border-black bg-white hover:border-violet gap-12">
        <Image
          src="assets/card/desktop/card_image1.svg"
          width={450}
          height={262}
          alt="Card Image"
          className="rounded-6 w-full h-auto"
        />
        <div className="flex flex-col gap-10">
          <span className="text-black font-medium">새로운 일정 관리 Taskify</span>
          <div className="inline-flex gap-6">
            <Image src="assets/card/exampleChip/large1.svg" width={44} height={22} alt="chip" className="w-auto" />
            <Image src="assets/card/exampleChip/large3.svg" width={44} height={22} alt="chip" className="w-auto" />
          </div>
        </div>
        <div className="flex flex-row justify-between content-center">
          <div className="flex flex-row gap-6">
            <Image src="assets/icon/calendar.svg" width={18} height={18} alt="date" className="inline" />
            <span className="font-medium text-gray-78">2022.12.31</span>
          </div>
          <Image src="assets/chip/ellipseDefault.svg" width={24} height={24} alt="profileImg" />
        </div>
      </div>
    </>
  );
};
