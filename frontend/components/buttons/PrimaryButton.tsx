'use client';
import { ReactNode } from 'react';

type PrimaryButtonParams = {
  children: ReactNode;
  onClick: () => void;
  size?: 'lg' | 'sm';
};
export const PrimaryButton = ({
  children,
  onClick,
  size = 'sm',
}: PrimaryButtonParams) => {
  return (
    <button
      className={
        `text-${size} font-bold text-white` +
        ` ${size === 'sm' ? 'px-8 py-2' : 'px-8 py-4'}` +
        ' bg-orange-400 rounded rounded-3xl hover:shadow-xl'
      }
      onClick={onClick}
    >
      {children}
      <div className={'hover:shadow-xl'}></div>
    </button>
  );
};
