import { twMerge } from 'tailwind-merge';

const InitialImage = ({ nickname, className }: { nickname: string; className?: string }) => {
  const initial = String(nickname[0]).toUpperCase();

  return (
    <div
      className={twMerge(
        'w-30 h-30 border-2 rounded-99 bg-blue-bg flex items-center justify-center text-blue',
        className,
      )}
    >
      {initial}
    </div>
  );
};

export default InitialImage;
