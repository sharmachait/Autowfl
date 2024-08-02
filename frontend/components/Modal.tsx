import { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/app/config';
import axios from 'axios';
import { EmailSelector } from '@/components/EmailSelector';
import { SolanaSelector } from '@/components/SolanaSelector';

type ModalParams = {
  id: number;
  onSelect: (
    props: null | { name: string; id: string; metadata?: any }
  ) => void;
  availableItems: availableActionType[] | availableTriggerType[];
};

export function Modal({ id, onSelect, availableItems }: ModalParams) {
  const [step, setStep] = useState(0);

  const [selectedAction, setSelectedAction] = useState<null | {
    name: string;
    id: string;
  }>(null);

  const isTrigger = id === 1;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen md:inset-0 max-h-full bg-orange-200 bg-opacity-70 flex">
      <div className="relative p-4 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t ">
            <div className="text-md">
              Select {id === 1 ? 'Trigger' : 'Action'}
            </div>
            <button
              onClick={() => {
                onSelect(null);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className={'p-2 md:p-2 space-y-4 text-md'}>
            {step === 1 && selectedAction?.id === 'email' && (
              <EmailSelector
                setMetadata={(metadata) => {
                  onSelect({
                    ...selectedAction,
                    metadata,
                  });
                }}
              ></EmailSelector>
            )}
            {step === 1 && selectedAction?.id === 'send-sol' && (
              <SolanaSelector
                setMetadata={(metadata) => {
                  onSelect({
                    ...selectedAction,
                    metadata,
                  });
                }}
              ></SolanaSelector>
            )}
            {step === 0 && (
              <div className={'flex flex-col gap-1'}>
                {availableItems.map(({ id, name, image }) => {
                  return (
                    <div
                      onClick={() => {
                        if (isTrigger) {
                          onSelect({ id: id, name: name });
                        } else {
                          setSelectedAction({
                            id: id,
                            name: name,
                          });
                          setStep((x) => x + 1);
                        }
                      }}
                      className={
                        'flex gap-2 border justify-center items-center cursor-pointer hover:bg-orange-100'
                      }
                    >
                      <img src={image} width={30} className={'rounded-full'} />
                      <div>{name}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState<
    availableActionType[]
  >([]);
  const [availableTriggers, setAvailableTriggers] = useState<
    availableTriggerType[]
  >([]);
  useEffect(() => {
    //send two backend requests
    axios
      .get(`${BACKEND_URL}/api/v1/trigger/available`)
      .then((x) => setAvailableTriggers(x.data.availableTriggers));
    axios
      .get(`${BACKEND_URL}/api/v1/action/available`)
      .then((x) => setAvailableActions(x.data.availableActions));
    //harkirat vide0 at 15:00
  }, []);

  return {
    availableActions,
    availableTriggers,
  };
}

type availableActionType = { id: string; name: string; image: string };
type availableTriggerType = { id: string; name: string; image: string };
