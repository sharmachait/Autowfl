import { Router } from 'express';
import authMiddleware from '../middleware';

const router = Router();
router.post('/signup', (req, res) => {
  console.log('signup');
});
router.post('/signin', (req, res) => {
  console.log('signin');
});
router.get('/profile', authMiddleware, (req, res) => {
  console.log('profile');
});
export default router;
