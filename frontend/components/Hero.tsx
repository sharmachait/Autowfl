'use client';

import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { SecondaryButton } from '@/components/buttons/SecondaryButton';
import { Tag } from '@/components/Tag';
import { useRouter } from 'next/navigation';

export const Hero = () => {
  const router = useRouter();
  return (
    <div className={'flex flex-col items-center justify-start'}>
      <div className="text-5xl font-semibold pt-16 flex justify-center">
        <div className={'max-w-2xl text-center'}>
          Automate as fast as you can type
        </div>
      </div>
      <div className="text-xl font-normal pt-6 flex justify-center">
        <div className={'max-w-4xl text-center'}>
          Ai gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>
      <div className={'flex gap-4 pt-8'}>
        <PrimaryButton
          onClick={() => {
            router.push('/signup');
          }}
          size={'lg'}
        >
          Get started free
        </PrimaryButton>
        <SecondaryButton onClick={() => {}} size={'lg'}>
          Contact Sales
        </SecondaryButton>
      </div>
      <div className="flex justify-center pt-10 gap-8">
        <Tag title={'Free forever'} subtitle={'for core features'}></Tag>
        <Tag title={'More apps'} subtitle={'than any other platform'}></Tag>
        <Tag title={'Cutting-edge'} subtitle={'AI features'}></Tag>
      </div>
    </div>
  );
};
