import { Router } from 'express';
import authMiddleware from '../middleware';

const router = Router();
router.post('/', authMiddleware, (req, res) => {
  console.log('create workflow');
});
router.get('/', authMiddleware, (req, res) => {
  console.log('get workflows');
});
router.get('/:workflowId', authMiddleware, (req, res) => {
  console.log(req.params.workflowId);
});
export default router;
