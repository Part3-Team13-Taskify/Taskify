import Image from 'next/image';
import check from '@/public/assets/chip/doneLarge.svg';
import { useState } from 'react';
import { COLORCODES } from '../colorpicker';

const ModalColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
  const handleSelectColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="flex gap-10 mobile:hidden">
        {COLORCODES.map((color) => (
          <div key={color} className={`bg-${color} relative`}>
            <Image src={color} alt="color" width={30} onClick={(e) => handleSelectColor(e, color)} />
            {selectedColor === color && (
              <Image
                src={check}
                alt="check"
                width={24}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        ))}
      </div>
      <div className="gap-10 hidden mobile:flex">
        {COLORS.map((color) => (
          <div key={color} className={`bg-${color} relative`}>
            <Image src={color} alt="color" width={28} onClick={(e) => handleSelectColor(e, color)} />
            {selectedColor === color && (
              <Image
                src={check}
                alt="check"
                width={22}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ModalColorPicker;
