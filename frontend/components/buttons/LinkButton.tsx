'use client';
import { ReactNode } from 'react';

type LinkButtonParams = {
  children: ReactNode;
  onClick: () => void;
};
export const LinkButton = ({ children, onClick }: LinkButtonParams) => {
  return (
    <button
      className={
        'px-2 py-1 cursor-pointer hover:bg-slate-200 rounded-3xl font-extralight '
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
