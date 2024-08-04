import { PrismaClient } from '@prisma/client';
import { Kafka } from 'kafkajs';
const TOPIC = 'workflow-events';
const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092'],
});
const client = new PrismaClient();
async function publisher() {
  const producer = kafka.producer();
  await producer.connect();
  while (1) {
    await client.$transaction(async (tx) => {
      const pendingRows = await tx.workflowRunOutbox.findMany({
        where: {},
        take: 10,
      });
      console.log({ pendingRows });
      await producer.send({
        topic: TOPIC,
        messages: pendingRows.map((r) => ({
          value: JSON.stringify({
            workflowRunId: r.workflowRunId.toString(),
            stage: 0,
          }),
        })),
      });

      await tx.workflowRunOutbox.deleteMany({
        where: {
          id: {
            in: pendingRows.map((x) => x.id),
          },
        },
      });
    });
  }
}

publisher();
