import { PrismaClient } from '@prisma/client';
import { Kafka } from 'kafkajs';
import { JsonObject } from '@prisma/client/runtime/library';
import { parse } from './parser';
import { sendEmail } from './services/email';
const TOPIC = 'workflow-events';
const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092'],
});
const prismaClient = new PrismaClient();

async function worker() {
  const consumer = kafka.consumer({ groupId: 'worker' });
  await consumer.connect();
  await consumer.subscribe({
    topic: TOPIC,
    fromBeginning: true,
  });
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });

      if (!message.value?.toString()) {
        return;
      }
      const parsedValue = JSON.parse(message?.value?.toString());
      //the offset we last committed will be picked up again if the process died while executing it
      const workflowRunId = parsedValue.workflowRunId;
      const stage = parseInt(parsedValue.stage);

      const workflowRunDetails = await prismaClient.workflowRun.findFirst({
        where: {
          id: workflowRunId,
        },
        include: {
          workflow: {
            include: {
              trigger: true,
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const actions = workflowRunDetails?.workflow?.actions;
      if (!actions) return;

      const currentAction = workflowRunDetails?.workflow?.actions.find(
        (x) => x.sortingOrder === stage
      );
      if (!currentAction) {
        console.log('Action not found');
        return;
      }
      // console.log({ currentAction });
      // console.log({ 'run detials': workflowRunDetails.metadata });
      const workflowMetdata = workflowRunDetails.metadata;

      if (currentAction.type.id === 'email') {
        await email(currentAction, workflowMetdata);
      } else if (currentAction.type.id === 'send-sol') {
        await solana(currentAction, workflowMetdata);
      }

      const lastStage = actions.length - 1;

      if (stage !== lastStage) {
        await publish({ workflowRunId, stage: stage + 1 });
      }

      await consumer.commitOffsets([
        {
          topic,
          partition,
          offset: '' + (parseInt(message.offset) + 1),
        },
      ]);
    },
  });
}

async function email(currentAction: any, workflowMetdata: any) {
  console.log('SendEmail()');
  const body = parse(
    (currentAction.metadata as JsonObject)?.body as string,
    workflowMetdata
  );
  const email = parse(
    (currentAction.metadata as JsonObject)?.email as string,
    workflowMetdata
  );
  console.log(await sendEmail(email, body));
  console.log({ email, body });
}

async function solana(currentAction: any, workflowMetdata: any) {
  console.log('sendSol()');
  const amount = parse(
    (currentAction.metadata as JsonObject)?.amount as string,
    workflowMetdata
  );
  const address = parse(
    (currentAction.metadata as JsonObject)?.address as string,
    workflowMetdata
  );
  console.log({ amount, address });
}

async function publish(message: { workflowRunId: string; stage: number }) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: TOPIC,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
}
worker();
