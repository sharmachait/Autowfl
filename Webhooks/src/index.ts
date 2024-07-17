import express from 'express';
import {PrismaClient} from '@prisma/client';

const client=new PrismaClient();
const app = express();
app.use(express.json());
//https://domain.com/hooks/catch/{userId}/{zapId}
//add some auth middleware
app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
  const userId = req.params.userId;
  const workflowId = req.params.zapId;
  const body=req.body;

  //we only need to create a trigger event here
  //dont process the trigger here
  //store the trigger into the db
  //push the trigger into a queue
  console.log('control reached here');
  console.log(workflowId);
  console.log(body);
  await client.$transaction(async tx=>{

    const run=await client.workflowRun.create({
      data:{
        workflowId:parseInt(workflowId),
        metadata:body
      }
    });

    await client.workflowRunOutbox.create({
      data:{
        workflowRunId:run.id
      }
    });

  })

  res.json({msg:"sent"});

});

app.listen(3000);
