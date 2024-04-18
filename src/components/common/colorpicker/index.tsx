import green from '@/public/assets/chip/ellipseGreenLarge.svg';
import blue from '@/public/assets/chip/ellipseBlueLarge.svg';
import pink from '@/public/assets/chip/ellipsePinkLarge.svg';
import purple from '@/public/assets/chip/ellipsePurpleLarge.svg';
import yellow from '@/public/assets/chip/ellipseYellowLarge.svg';
import Image from 'next/image';
import check from '@/public/assets/chip/doneLarge.svg';
import { useState } from 'react';

const COLORS = [green, blue, pink, purple, yellow];

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleSelectColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex gap-10">
      {COLORS.map((color) => (
        <div key={color} className={`bg-${color} relative`}>
          <Image src={color} alt="check" width={30} onClick={(e) => handleSelectColor(e, color)} />
          {selectedColor === color && <Image src={check} alt="check" width={30} className="absolute top-0 left-0" />}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
