import { Router } from 'express';
import authMiddleware from '../middleware';
import prismaClient from '../db';
const router = Router();
router.get('/available', async (req, res) => {
  const availableActions = await prismaClient.availableAction.findMany({});
  res.json({ availableActions });
});
export default router;
