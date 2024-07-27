'use client';
import { ReactNode } from 'react';

type PrimaryButtonParams = {
  children: ReactNode;
  onClick: () => void;
  size?: 'lg' | 'sm' | 'xs';
};
export const PrimaryButton = ({
  children,
  onClick,
  size = 'sm',
}: PrimaryButtonParams) => {
  return (
    <button
      className={
        `text-${size} font-semibold text-white` +
        ` ${size === 'sm' || size == 'xs' ? 'px-4 py-1' : 'px-10 py-2'}` +
        ' bg-orange-400 rounded rounded-3xl hover:shadow-xl'
      }
      onClick={onClick}
    >
      {children}
      <div className={'hover:shadow-xl'}></div>
    </button>
  );
};
