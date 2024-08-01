'use client';
import { Appbar } from '@/components/Appbar';
import { ZapCell } from '@/components/ZapCell';
import { useState } from 'react';
import { LinkButton } from '@/components/buttons/LinkButton';
import { Modal, useAvailableActionsAndTriggers } from '@/components/Modal';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
const WorkflowCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});

type workflowType = z.infer<typeof WorkflowCreateSchema>;

export default function () {
  const [selectedTrigger, setSelectedTrigger] = useState<{
    availableTriggerId: string;
    availableTriggerName: string;
    availableTriggerImage: string;
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      availableActionId: string;
      availableActionName: string;
      availableActionImage: string;
      index: number;
    }[]
  >([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null
  );

  const { availableActions, availableTriggers } =
    useAvailableActionsAndTriggers();
  const router = useRouter();
  return (
    <div>
      <div className={'z-10'}>
        <Appbar></Appbar>
      </div>
      <div
        className={
          'z-0 w-full min-h-screen max-h-full bg-slate-100 flex flex-col'
        }
      >
        <div className="my-4 flex justify-end mx-12">
          <PrimaryButton
            size={'lg'}
            onClick={async () => {
              if (
                selectedTrigger == undefined ||
                selectedTrigger.availableTriggerId == undefined
              )
                return;

              const actions = [];

              for (let a of selectedActions) {
                actions.push({
                  availableActionId: a.availableActionId,
                  actionMetadata: 'nothing as of now',
                });
              }

              const body: workflowType = {
                availableTriggerId: selectedTrigger.availableTriggerId,
                triggerMetadata: 'nothing as of now',
                actions: actions,
              };

              const response = await axios.post(
                `${BACKEND_URL}/api/v1/workflow`,
                body,
                {
                  headers: { Authorization: localStorage.getItem('token') },
                }
              );
              console.log(response.status);
              if (response.status === 200) {
                router.push('/dashboard');
              }
            }}
          >
            Publish
          </PrimaryButton>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center  ">
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
                image={
                  selectedTrigger?.availableTriggerImage
                    ? selectedTrigger.availableTriggerImage
                    : ''
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
                    image={action.availableActionImage}
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
                      availableActionImage: '',
                      index: a.length + 2,
                    },
                  ]);
                }}
              >
                +
              </LinkButton>
            </div>
          </div>
        </div>
      </div>

      {selectedModalIndex && (
        <Modal
          availableItems={
            selectedModalIndex === 1 ? availableTriggers : availableActions
          }
          id={selectedModalIndex}
          onSelect={(
            props: null | { id: string; name: string; image: string }
          ) => {
            if (props === null) {
              setSelectedModalIndex(null);
            }
            if (selectedModalIndex === 1 && props !== null) {
              setSelectedTrigger({
                availableTriggerId: props.id,
                availableTriggerName: props.name,
                availableTriggerImage: props.image,
              });
            } else if (props !== null) {
              setSelectedActions((a) => {
                let newActions = [...a];
                let prevAction = newActions[selectedModalIndex - 2];

                newActions[selectedModalIndex - 2] = {
                  index: prevAction.index,
                  availableActionName: props.name,
                  availableActionId: props.id,
                  availableActionImage: props.image,
                };

                return newActions;
              });
            }
            setSelectedModalIndex(null);
          }}
        ></Modal>
      )}
    </div>
  );
}
