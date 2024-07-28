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
        ' flex justify-center items-center w-fit px-4 py-1 cursor-pointer hover:bg-slate-200 rounded-3xl font-light '
      }
      onClick={onClick}
    >
      <div className={'flex-1 w-full'}>{children}</div>
    </button>
  );
};
