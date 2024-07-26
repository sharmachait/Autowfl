'use client';
import { LinkButton } from '@/components/buttons/LinkButton';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

export const Appbar = () => {
  const router = useRouter();
  return (
    <div className={'flex border-b justify-around items-center p-2 text-sm'}>
      <div className={'text-xl font-extrabold'}>Zapier</div>
      <div className={'flex gap-5 items-center'}>
        <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        <LinkButton
          onClick={() => {
            router.push('/login');
          }}
        >
          Login
        </LinkButton>
        <PrimaryButton
          onClick={() => {
            router.push('/signup');
          }}
          size={'sm'}
        >
          Signup
        </PrimaryButton>
      </div>
    </div>
  );
};
