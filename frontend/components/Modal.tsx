import { useEffect, useState } from 'react';

type ModalParams = {
  id: number;
  onSelect: (props: null | { name: string; id: string }) => void;
};
export function Modal({ id, onSelect }: ModalParams) {
  console.log('hi');
  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-orange-200 bg-opacity-70 flex">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
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
            kfdjghfdkjhgkjdfhgkjh
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
  }, []);

  return {
    availableActions,
    availableTriggers,
  };
}

type availableActionType = { id: string; name: string; image: string }[];
type availableTriggerType = { id: string; name: string; image: string }[];
