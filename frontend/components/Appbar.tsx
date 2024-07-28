'use client';
import { LinkButton } from '@/components/buttons/LinkButton';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

export const Appbar = () => {
  const router = useRouter();
  return (
    <div className={'flex border-b justify-between items-center p-2  mx-8 '}>
      <div className={'text-xl font-extrabold'}>Zapier</div>
      <div className={'flex gap-1 items-center text-xs'}>
        <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
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
    </div>
  );
};
