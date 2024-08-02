import { Input } from '@/components/Input';
import { useState } from 'react';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

export const EmailSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  return (
    <div className={'flex flex-col gap-2'}>
      <Input
        label={"Receiver's Email"}
        placeholder={'abc@gmail.com'}
        type={'text'}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></Input>
      <Input
        label={'Body'}
        placeholder={'Message'}
        type={'text'}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      ></Input>
      <PrimaryButton
        size={'sm'}
        onClick={() => {
          setMetadata({ email, body });
        }}
      >
        Submit
      </PrimaryButton>
    </div>
  );
};
