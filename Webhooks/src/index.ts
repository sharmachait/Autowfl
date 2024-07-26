import express from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
const app = express();
app.use(express.json());
//https://domain.com/hooks/catch/{userId}/{workflowId}
//add some auth middleware
app.post('/hooks/catch/:userId/:workflowId', async (req, res) => {
  const userId = req.params.userId;
  const workflowId = req.params.workflowId;
  const body = req.body;

  //we only need to create a trigger event here
  //dont process the trigger here
  //store the trigger into the db
  //push the trigger into a queue
  console.log('control reached here');
  console.log(workflowId);
  console.log(body);
  await client.$transaction(async (tx) => {
    const run = await tx.workflowRun.create({
      data: {
        workflowId: workflowId,
        metadata: body,
      },
    });

    await tx.workflowRunOutbox.create({
      data: {
        workflowRunId: run.id,
      },
    });
  });

  res.json({ msg: 'sent' });
});

app.listen(3000);
