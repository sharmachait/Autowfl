'use client';
import { LinkButton } from '@/components/buttons/LinkButton';
import { signIn, signOut, useSession } from 'next-auth/react';

export const Appbar = () => {
  const session = useSession();
  return (
    <div className={'flex border-b justify-between items-center p-2  mx-8 '}>
      <div className={'text-xl font-extrabold'}>Zapier</div>
      <div className={'flex gap-1 items-center text-xs'}>
        {session.status === 'authenticated' && (
          <div>Hi, {session?.data?.user?.name}</div>
        )}
        <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        <div className={'flex gap-1 items-center text-xs'}>
          {session.status === 'unauthenticated' && (
            <LinkButton
              onClick={() => {
                signIn(undefined, { callbackUrl: '/dashboard' });
              }}
            >
              Log in
            </LinkButton>
          )}
          {session.status === 'authenticated' && (
            <LinkButton
              onClick={() => {
                signOut();
              }}
            >
              Log out
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};
