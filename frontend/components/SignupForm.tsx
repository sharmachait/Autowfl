'use client';
import { Input } from '@/components/Input';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

export const SignupForm = (props: any) => {
  return (
    <div className={'flex flex-col gap-4 w-full p-4 border'}>
      <Input
        onChange={(e) => {}}
        type="text"
        placeholder={'Your name'}
        label={'Name'}
      />
      <Input
        onChange={(e) => {}}
        type="text"
        placeholder={'Your email'}
        label={'Email'}
      />
      <Input
        onChange={(e) => {}}
        type="password"
        placeholder={'Your password'}
        label={'Password'}
      />
      <PrimaryButton size={'lg'} onClick={() => {}}>
        Get started free
      </PrimaryButton>
    </div>
  );
};
