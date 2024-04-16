import Image from 'next/image';

export const Card = ({ src, title, date }: { src?: string; title: string; date: string }) => {
  return (
    <>
      <div className="max-w-450 md:max-w-full xl:max-w-450 rounded-6 py-20 px-20 m-10 border-1 border-gray-d9 bg-white hover:border-violet">
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
            <span className="text-black font-medium">{title}</span>
            <div className="flex flex-col md:flex-row xl:flex-col gap-10">
              <div className="flex gap-6">
                <Image src="assets/card/exampleChip/large1.svg" width={44} height={22} alt="chip" className="w-auto" />
                <Image src="assets/card/exampleChip/large3.svg" width={44} height={22} alt="chip" className="w-auto" />
              </div>
              <div className="flex flex-row justify-between content-center w-full">
                <div className="flex flex-row gap-6">
                  <Image src="assets/icon/calendar.svg" width={18} height={18} alt="date" className="inline-block" />
                  <span className="font-medium text-gray-78">{date}</span>
                </div>
                <Image src="assets/chip/ellipseDefault.svg" width={24} height={24} alt="profileImg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
