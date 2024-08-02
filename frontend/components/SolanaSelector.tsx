import { Input } from '@/components/Input';
import { useState } from 'react';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

export const SolanaSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className={'flex flex-col gap-2'}>
      <Input
        label={"Receiver's Address"}
        placeholder={'Enter address'}
        type={'text'}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      ></Input>
      <Input
        label={'Amount'}
        placeholder={'10 sol'}
        type={'text'}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      ></Input>
      <PrimaryButton
        size={'sm'}
        onClick={() => {
          setMetadata({ amount, address });
        }}
      >
        Submit
      </PrimaryButton>
    </div>
  );
};
