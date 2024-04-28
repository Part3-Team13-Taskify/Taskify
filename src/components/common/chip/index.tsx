import Image from 'next/image';
import ellipse from '@/public/assets/chip/ellipseDefault.svg';
import add from '@/public/assets/icon/addViolet.svg';

interface ChipProps {
  children?: React.ReactNode;
  color?: 'default' | 'green' | 'blue' | 'pink' | 'violet' | 'orange';
  size?: 'small' | 'large';
  dot?: boolean;
  plus?: boolean;
}

const colorClasses = {
  default: 'bg-gray-ee text-gray-78',
  green: 'bg-green-bg text-green',
  blue: 'bg-blue-bg text-blue',
  pink: 'bg-pink-bg text-pink',
  violet: 'bg-violet-8% text-violet',
  orange: 'bg-orange-bg text-orange',
};

const sizeClasses = {
  small: 'text-10',
  large: 'text-12',
};

const Chip = ({ children, color = 'orange', size = 'large', dot, plus }: ChipProps) => {
  const colorClass = colorClasses[color];
  const sizeClass = sizeClasses[size];

  return (
    <>
      {!plus && (
        <div className={`inline-block rounded-4 px-8 py-4 ${colorClass} ${sizeClass}  text-center`}>
          <div className="flex gap-6">
            {dot && <Image src={ellipse} alt="ellipse" width={6} />}
            {children}
          </div>
        </div>
      )}
      {plus && (
        <div className={` w-22 h-22 rounded-3 ${colorClass} ${sizeClass} flex items-center justify-center`}>
          <Image src={add} alt="add" width={16} />
        </div>
      )}
    </>
  );
};

export default Chip;
