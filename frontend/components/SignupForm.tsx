'use client';
import { Input } from '@/components/Input';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  return (
    <div className={'flex flex-col gap-4 w-full p-4 border'}>
      <Input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        placeholder={'Your name'}
        label={'Name'}
      />
      <Input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder={'Your email'}
        label={'Email'}
      />
      <Input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder={'Your password'}
        label={'Password'}
      />
      <PrimaryButton
        size={'lg'}
        onClick={async () => {
          const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
            username: email,
            password: password,
            name: name,
          });
          router.push('/login');
        }}
      >
        Get started free
      </PrimaryButton>
    </div>
  );
};
