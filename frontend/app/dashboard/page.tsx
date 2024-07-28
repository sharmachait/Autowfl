'use client';
import { DarkButton } from '@/components/buttons/DarkButton';
import { Appbar } from '@/components/Appbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';
import { ZapTable } from '@/components/ZapTable';

export default function () {
  const { loading, zaps } = useZaps();

  return (
    <div>
      <Appbar></Appbar>
      <div
        className={'flex justify-between items-center max-w-screen-lg mx-auto'}
      >
        <div>
          <div className={'text-2xl font-semibold'}>My Zaps</div>
          {loading ? 'Loading...' : <ZapTable zaps={zaps}></ZapTable>}
        </div>
        <DarkButton size={'lg'} onClick={() => {}}>
          Create
        </DarkButton>
      </div>
    </div>
  );
}

export interface Zap {
  id: string;
  triggerId: string;
  userId: string;
  actions: {
    id: string;
    sortingOrder: number;
    workflowId: string;
    typeId: string;
    type: {
      id: string;
      name: string;
    };
  }[];
  trigger: {
    id: string;
    typeId: string;
    workflowId: string;
    type: {
      id: string;
      name: string;
    };
  };
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);
  useEffect(() => {
    let config = {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    };
    console.log(localStorage.getItem('token'));
    axios
      .get(`${BACKEND_URL}/api/v1/workflow`, config)
      .then((res) => {
        setZaps(res.data.workflows);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  }, []);
  return { loading, zaps };
}
