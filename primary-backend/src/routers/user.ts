import { Router } from 'express';
import authMiddleware from '../middleware';
import { SigninSchema, SignupSchema } from '../types';
import prismaClient from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

const router = Router();
router.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const parsedData = SignupSchema.safeParse({ username, password, name });

  if (!parsedData.success) {
    return res.status(411).send({ message: 'Incorrect inputs' });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (user) {
    return res
      .status(403)
      .send({ message: 'An account with this email already exists' });
  }
  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });
  //bcrypt password
  //create verification token
  //save verification token in db
  //send verification email
  //create another table for account, different from user table
  return res.json({ message: 'Please verify your account' });
});

router.post('/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const parsedData = SigninSchema.safeParse({ username, password });

  if (!parsedData.success) {
    return res.status(411).send({ message: 'Incorrect inputs' });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).send({ message: 'Incorrect credentials' });
  }
  //jwt cookie
  const token = jwt.sign({ id: user.id }, jwtSecret);
  res
    .cookie('token', token, { sameSite: 'none', secure: true })
    .status(201)
    .json({ id: user.id, username });
});

declare global {
  namespace Express {
    interface Request {
      id: number;
    }
  }
}

router.get('/user', authMiddleware, (req, res) => {
  const id = req.id;
  //todo fix the type
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  return res.json({
    user,
  });
});
export default router;
