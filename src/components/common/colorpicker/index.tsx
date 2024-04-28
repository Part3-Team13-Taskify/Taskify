import Image from 'next/image';
import check from '@/public/assets/chip/doneLarge.svg';

const COLORCODES = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

type ColorPickerProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  modal?: boolean;
};

const ColorPicker = ({ selectedColor, setSelectedColor, modal }: ColorPickerProps) => {
  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      {modal ? (
        <div className="flex gap-10">
          {COLORCODES.map((color) => (
            <div
              key={color}
              className="relative w-30 h-30 rounded-99 cursor-pointer mobile:w-28 mobile:h-28"
              style={{ backgroundColor: color }}
              onClick={() => handleSelectColor(color)}
            >
              {selectedColor === color && (
                <div className="w-30 h-30 mobile:w-22 mobile-h-22">
                  <Image src={check} alt="check" width={30} className="absolute top-0 left-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex gap-10 mobile:hidden">
            {COLORCODES.map((color) => (
              <div
                key={color}
                className="relative w-30 h-30 rounded-99 cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => handleSelectColor(color)}
              >
                {selectedColor === color && (
                  <Image src={check} alt="check" width={30} className="absolute top-0 left-0" />
                )}
              </div>
            ))}
          </div>
          <div className="gap-10 hidden mobile:flex">
            <div className="relative w-30 h-30 rounded-99" style={{ backgroundColor: selectedColor }}>
              <Image src={check} alt="check" width={30} className="absolute top-0 left-0" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;
