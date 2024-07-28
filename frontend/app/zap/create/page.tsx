'use client';
import { Appbar } from '@/components/Appbar';
import { ZapCell } from '@/components/ZapCell';
import { useState } from 'react';
import { LinkButton } from '@/components/buttons/LinkButton';

export default function () {
  const [selectedTrigger, setSelectedTrigger] = useState('');
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);
  return (
    <div>
      <div className={'z-10'}>
        <Appbar></Appbar>
      </div>
      <div className="z-0 w-full h-screen bg-slate-100 flex flex-col justify-center items-center overflow-y-scroll ">
        <div className={'pb-2'}>
          <ZapCell
            name={selectedTrigger ? selectedTrigger : 'Trigger'}
            index={1}
          ></ZapCell>
        </div>
        <div className={''}>
          {selectedActions.map((action, i) => (
            <div className={'pb-2'} key={i}>
              <ZapCell
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : 'Action'
                }
                index={1 + i}
              ></ZapCell>
            </div>
          ))}
        </div>
        <div className={'r'}>
          <LinkButton
            onClick={() => {
              setSelectedActions((a) => [
                ...a,
                { availableActionId: '', availableActionName: '' },
              ]);
            }}
          >
            +
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
