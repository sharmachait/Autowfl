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
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      console.log({
        partition,
        val: message.value?.toString(),
        offset: message.offset,
        topic,
      });
      //the offset we last committed will be picked up again if the process died while executing it
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
worker();
