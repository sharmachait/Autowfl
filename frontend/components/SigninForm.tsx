'use client';
import { Input } from '@/components/Input';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { useState } from 'react';
import { BACKEND_URL } from '@/app/config';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const SigninForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  return (
    <div className={'flex flex-col gap-4 w-full p-4 border'}>
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
          const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
            username: email,
            password: password,
          });
          localStorage.setItem('token', res.data.token);
          console.log({ token: res.data.token });
          router.push('/dashboard');
        }}
      >
        Login
      </PrimaryButton>
    </div>
  );
};
