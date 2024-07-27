'use client';
import { ReactNode } from 'react';

type PrimaryButtonParams = {
  children: ReactNode;
  onClick: () => void;
  size?: 'lg' | 'sm' | 'xs';
};
export const SecondaryButton = ({
  children,
  onClick,
  size = 'sm',
}: PrimaryButtonParams) => {
  return (
    <button
      className={
        `text-${size} font-bold text-blacks` +
        ` ${size === 'sm' || size == 'xs' ? 'px-8 py-2' : 'px-10 py-2'}` +
        ' border border-black rounded rounded-3xl hover:shadow-xl'
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
