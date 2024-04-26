import Image from 'next/image';
import { RefObject, useEffect, useState } from 'react';
import arrow from '@/public/assets/icon/arrow.svg';
import arrowReverse from '@/public/assets/icon/arrowReverse.svg';
import Button from '../../common/button';

interface ScrollButtonProps {
  containerRef: RefObject<HTMLDivElement>;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ containerRef }) => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth);
      }
    };

    const handleResize = () => {
      checkScroll();
    };

    const handleScroll = () => {
      checkScroll();
    };

    const observer = new MutationObserver(() => {
      checkScroll();
    });

    if (containerRef.current) {
      checkScroll();
      observer.observe(containerRef.current, { attributes: true, childList: true, subtree: true });
    }

    window.addEventListener('resize', handleResize);
    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [containerRef]);

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

  return (
    <>
      {showLeftButton && (
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
      )}
      {showRightButton && (
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
      )}
    </>
  );
};

export default ScrollButton;
