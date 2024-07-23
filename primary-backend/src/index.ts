import express from 'express';
import userRouter from './routers/user';
import workflowRouter from './routers/workflow';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const jwtSecret = process.env.JwtSecret;

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true, // do for cookies
    origin: process.env.ClientUrl,
  })
);
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/workflow', workflowRouter);
app.listen(3001);
