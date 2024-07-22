import { Kafka } from 'kafkajs';
const TOPIC = 'workflow-events';
const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092'],
});

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
      console.log({
        partition,
        val: message.value?.toString(),
        offset: message.offset,
        topic,
      });
      await consumer.commitOffsets([
        {
          topic,
          partition,
          offset: message.offset,
        },
      ]);
    },
  });
}
worker();
