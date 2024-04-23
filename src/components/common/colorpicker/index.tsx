import Image from 'next/image';
import check from '@/public/assets/chip/doneLarge.svg';

const COLORCODES = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

type ColorPickerProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
  const handleSelectColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="flex gap-10 mobile:hidden">
        {COLORCODES.map((color) => (
          <div
            key={color}
            className="relative w-30 rounded-99 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={(e) => handleSelectColor(e, color)}
          >
            {selectedColor === color && <Image src={check} alt="check" width={30} className="absolute top-0 left-0" />}
          </div>
        ))}
      </div>
      <div className=" gap-10 hidden mobile:flex">
        <div className={`relative w-30 rounded-99 `} style={{ backgroundColor: selectedColor }}>
          <Image src={check} alt="check" width={30} className="absolute top-0 left-0" />
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
