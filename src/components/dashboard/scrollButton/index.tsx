import Image from 'next/image';
import { RefObject } from 'react';
import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Button from '../../common/button';

interface ScrollButtonProps {
  containerRef: RefObject<HTMLDivElement>;
  //   columnsListLength: number;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ containerRef }) => {
  //   const [showButton, setShowButton] = useState(false);

  //   const checkScroll = () => {
  //     const element = containerRef.current;
  //     if (element) {
  //       console.log(`scrollWidth: ${element.scrollWidth}, clientWidth: ${element.clientWidth}`);
  //       setShowButton(element.scrollWidth > element.clientWidth + 1);
  //     }
  //   };

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       checkScroll();
  //     }, 100); // Delay the check to allow layout to stabilize

  //     window.addEventListener('resize', checkScroll);
  //     return () => {
  //       clearTimeout(timer);
  //       window.removeEventListener('resize', checkScroll);
  //     };
  //   }, [containerRef, columnsListLength]);

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 354,
        behavior: 'smooth',
      });
    }
  };

  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 354,
        behavior: 'smooth',
      });
    }
  };

  //   if (!showButton) return null;

  return (
    <>
      <div className="fixed top-[50%] left-330 tablet:hidden">
        <Button
          className="w-40 h-40 hover:border-gray-78"
          buttonType="columnAdd"
          bgColor="white"
          textColor="black"
          type="button"
          onClick={scrollToLeft}
        >
          <Image src={arrow} alt="arrow" />
        </Button>
      </div>
      <div className="fixed top-[50%] right-30 tablet:hidden">
        <Button
          className="w-40 h-40 hover:border-gray-78"
          buttonType="columnAdd"
          bgColor="white"
          textColor="black"
          type="button"
          onClick={scrollToRight}
        >
          <Image src={arrowReverse} alt="arrow" />
        </Button>
      </div>
    </>
  );
};

export default ScrollButton;
