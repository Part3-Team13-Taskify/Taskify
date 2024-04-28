import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  buttonType: ButtonType;
  bgColor?: BgColor;
  textColor?: TextColor;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

type ButtonType =
  | 'login'
  | 'decision'
  | 'delete'
  | 'columnAdd'
  | 'add'
  | 'dashboardDelete'
  | 'arrow'
  | 'reverseArrow'
  | 'dashboardAdd'
  | 'modal1'
  | 'modal2';

type BgColor = 'violet' | 'white';

type TextColor = 'white' | 'black' | 'violet' | 'gray';

const buttonClasses = {
  // 로그인 버튼 : width-520px
  login: 'w-520 h-50 rounded-8 text-18 font-medium mobile:w-351',
  // 수락/거절 버튼 : width-84px
  decision: 'w-84 h-32 rounded-4 text-14 font-medium  tablet:w-72 tablet:h-30 mobile:w-109 mobile:h-28 mobile:text-12',
  // 삭제 버튼 : width-84px
  delete: 'w-84 h-32 rounded-4 text-14 font-medium mobile:w-52 mobile:h-28 mobile:text-12',
  // 컬럼 추가 버튼 : width-354px
  columnAdd:
    'flex justify-center items-center gap-12 w-200 h-60 rounded-50 text-18 font-bold  tablet:w-60 tablet:h-60 mobile:text-16',
  // +아이콘만 있는 버튼 : width-314px
  add: 'flex justify-center items-center w-314 h-40 rounded-6 tablet:w-544 mobile:w-284 mobile:h-32',
  // 대시보드삭제 버튼 : width-320px
  dashboardDelete: 'w-320 h-62 rounded-8 text-18 font-medium mobile:w-284 mobile:h-52 mobile:text-16',
  // 화살표 버튼 : width-40px
  arrow:
    'flex justify-center items-center w-40 h-40 rounded-tl-4 rounded-tr-0 rounded-br-0 rounded-bl-4 mobile:w-36 mobile:h-36',
  // 반대 화살표 버튼 : width-40px
  reverseArrow:
    'flex justify-center items-center w-40 h-40 rounded-tl-0 rounded-tr-4 rounded-br-4 rounded-bl-0 mobile:w-36 mobile:h-36',
  // 대시보드추가 버튼 : width-332px
  dashboardAdd:
    'flex justify-center items-center gap-12 h-70 rounded-8 text-16 font-semibold  tablet:h-68  mobile:h-58 mobile:text-14 mobile:text-14',
  // 모달버튼1 : width-83px
  modal1: 'w-83 h-32 rounded-4 text-12 font-medium mobile:w-84 mobile:h-28',
  // 모달버튼2 : width-120px
  modal2: 'w-120 h-48 rounded-8 text-16 font-medium mobile:w-138 mobile:h-42',
};

const bgColorClasses: Record<BgColor, string> = {
  violet: 'bg-violet disabled:bg-gray-9f',
  white: 'bg-white border-1 border-gray-d9',
};

const textColorClasses: Record<TextColor, string> = {
  white: 'text-white',
  black: 'text-black-33',
  violet: 'text-violet',
  gray: 'text-gray-78',
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  buttonType,
  bgColor,
  textColor,
  disabled,
  onClick,
  className,
}) => {
  const buttonClass = twMerge(buttonClasses[buttonType], className);
  const bgColorClass = bgColor ? bgColorClasses[bgColor] : '';
  const textColorClass = textColor ? textColorClasses[textColor] : '';

  return (
    <button
      className={`${buttonClass} ${bgColorClass} ${textColorClass}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
