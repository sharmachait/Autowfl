import { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/app/config';
import axios from 'axios';

type ModalParams = {
  id: number;
  onSelect: (props: null | { name: string; id: string; image: string }) => void;
  availableItems: availableActionType[] | availableTriggerType[];
};
export function Modal({ id, onSelect, availableItems }: ModalParams) {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen md:inset-0 h-[calc(100%-1rem)] max-h-full bg-orange-200 bg-opacity-70 flex">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className={'p-2 md:p-2 space-y-4 text-md'}>
            {availableItems.map(({ id, name, image }) => {
              return (
                <div
                  onClick={() => {
                    console.log({ id: id, name: name });
                    onSelect({ id: id, name: name, image: image });
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
