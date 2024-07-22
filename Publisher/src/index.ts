import {PrismaClient} from '@prisma/client';
import { Kafka } from 'kafkajs';
const TOPIC="workflow-events";
const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092'],
});
const client=new PrismaClient();
async function publisher(){
    const producer=kafka.producer();
    await producer.connect();
    while(1){
        const pendingRows=await client.workflowRunOutbox.findMany({
            where:{},
            take:10
        })

        await producer.send({
            topic:TOPIC,
            messages:pendingRows.map(r=>({value:r.workflowRunId.toString()}))
        });

        await client.workflowRunOutbox.deleteMany({
            where:{
                id:{
                    in:pendingRows.map(x=>x.id)
                }
            }
        });
    }
}

publisher();