'use client';
import { LinkButton } from '@/components/buttons/LinkButton';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';
import { log } from 'node:util';

export const Appbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string }>();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then((x) => {
        setUser(x.data.user);
        console.log(x.data.user);
      })
      .catch((x) => console.log(x));
  }, []);
  return (
    <div className={'flex border-b justify-between items-center p-2  mx-8 '}>
      <div className={'text-xl font-extrabold'}>Zapier</div>
      <div className={'flex gap-1 items-center text-xs'}>
        <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        {!user?.name && (
          <div className={'flex gap-1 items-center text-xs'}>
            <LinkButton
              onClick={() => {
                router.push('/login');
              }}
            >
              Log in
            </LinkButton>
            <PrimaryButton
              onClick={() => {
                router.push('/signup');
              }}
              size={'xs'}
            >
              Sign up
            </PrimaryButton>
          </div>
        )}
        {user?.name && (
          <div className={'flex gap-1 items-center text-xs'}>
            <LinkButton
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
              }}
            >
              Log out
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
};
