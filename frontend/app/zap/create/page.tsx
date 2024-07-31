'use client';
import { Appbar } from '@/components/Appbar';
import { ZapCell } from '@/components/ZapCell';
import { useState } from 'react';
import { LinkButton } from '@/components/buttons/LinkButton';
import { Modal } from '@/components/Modal';

export default function () {
  const [selectedTrigger, setSelectedTrigger] = useState<{
    availableTriggerId: string;
    availableTriggerName: string;
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
      index: number;
    }[]
  >([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null
  );
  return (
    <div>
      <div className={'z-10'}>
        <Appbar></Appbar>
      </div>
      <div className="z-0 w-full h-screen bg-slate-100 flex flex-col justify-center items-center overflow-y-scroll ">
        <div
          className={'pb-2'}
          onClick={() => {
            setSelectedModalIndex(1);
          }}
        >
          <ZapCell
            name={
              selectedTrigger?.availableTriggerName
                ? selectedTrigger.availableTriggerName
                : 'Trigger'
            }
            index={1}
          ></ZapCell>
        </div>
        <div className={''}>
          {selectedActions.map((action, i) => (
            <div
              className={'pb-2'}
              key={i}
              onClick={() => {
                setSelectedModalIndex(action.index);
              }}
            >
              <ZapCell
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : 'Action'
                }
                index={action.index}
              ></ZapCell>
            </div>
          ))}
        </div>
        <div className={'r'}>
          <LinkButton
            onClick={() => {
              setSelectedActions((a) => [
                ...a,
                {
                  availableActionId: '',
                  availableActionName: '',
                  index: a.length + 2,
                },
              ]);
            }}
          >
            +
          </LinkButton>
        </div>
      </div>

      {selectedModalIndex && (
        <Modal
          id={selectedModalIndex}
          onSelect={(props: null | { name: string; id: string }) => {
            if (props === null) {
              setSelectedModalIndex(null);
            }
            if (selectedModalIndex === 1 && props !== null) {
              setSelectedTrigger({
                availableTriggerId: props.id,
                availableTriggerName: props.name,
              });
            } else if (props !== null) {
              setSelectedActions((a) => {
                let newActions = [...a];
                let prevAction = newActions[selectedModalIndex - 2];

                newActions[selectedModalIndex - 2] = {
                  index: prevAction.index,
                  availableActionName: props.name,
                  availableActionId: props.id,
                };

                return newActions;
              });
            }
          }}
        ></Modal>
      )}
    </div>
  );
}
