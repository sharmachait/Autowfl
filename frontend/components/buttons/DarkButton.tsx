'use client';
import { ReactNode } from 'react';

type PrimaryButtonParams = {
  children: ReactNode;
  onClick: () => void;
  size?: 'lg' | 'sm' | 'xs';
};
export const DarkButton = ({
  children,
  onClick,
  size = 'sm',
}: PrimaryButtonParams) => {
  return (
    <button
      className={
        `text-${size} font-semibold text-white` +
        ` ${size === 'sm' || size == 'xs' ? 'px-4 py-1' : 'px-10 py-2'}` +
        ' bg-blue-950 rounded rounded-lg hover:shadow-xl'
      }
      onClick={onClick}
    >
      {children}
      <div className={'hover:shadow-xl bg-'}></div>
    </button>
  );
};
