'use client';
import { DarkButton } from '@/components/buttons/DarkButton';
import { Appbar } from '@/components/Appbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';
import { ZapTable } from '@/components/ZapTable';
import { useRouter } from 'next/navigation';

export default function () {
  const { loading, zaps } = useZaps();
  const router = useRouter();
  return (
    <div>
      <Appbar></Appbar>
      <div className="w-full mt-10 max-w-6xl px-8 mx-auto">
        <div className={'flex gap-10 justify-between items-center pb-5'}>
          <div className={'text-2xl font-semibold'}>My Zaps</div>
          <DarkButton
            size={'lg'}
            onClick={() => {
              router.push('/zap/create');
            }}
          >
            Create
          </DarkButton>
        </div>
        {loading ? (
          'Loading...'
        ) : (
          <div className={'pt-5'}>
            <ZapTable zaps={zaps}></ZapTable>
          </div>
        )}
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
