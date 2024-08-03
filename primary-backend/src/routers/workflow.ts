import { Router } from 'express';
import authMiddleware from '../middleware';
import { WorkflowCreateSchema } from '../types';
import prismaClient from '../db';

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
  const body = req.body;
  const parsedData = WorkflowCreateSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(411).json({ message: 'Incorrect inputs.' });
  }
  console.log(parsedData.data);
  const workflowId = await prismaClient.$transaction(async (tx) => {
    const workflow = await tx.workflow.create({
      data: {
        triggerId: '',
        userId: req.id,
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            typeId: x.availableActionId,
            sortingOrder: index,
            metadata: x.actionMetadata,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        typeId: parsedData.data.availableTriggerId,
        workflowId: workflow.id,
        metadata: parsedData.data.triggerMetadata,
      },
    });

    await tx.workflow.update({
      where: {
        id: workflow.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
    return workflow.id;
  });
  return res.json({ workflowId });
});

router.get('/', authMiddleware, async (req, res) => {
  const id = req.id;
  const workflows = await prismaClient.workflow.findMany({
    where: { userId: id },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  return res.json({ workflows });
});

router.get('/:workflowId', authMiddleware, async (req, res) => {
  const id = req.id;
  const workflowId = req.params.workflowId;
  const workflow = await prismaClient.workflow.findFirst({
    where: { id: workflowId, userId: id },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  return res.json({ workflow });
});

// router.get('/:workflowId', authMiddleware, (req, res) => {
//   console.log(req.params.workflowId);
// });
export default router;
