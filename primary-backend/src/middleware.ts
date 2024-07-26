import { Request, Response, NextFunction } from 'express';
import { jwtSecret } from './config';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.cookies?.token;
  console.log({ ...req.cookies });
  if (!token) {
    return res.status(403).json({ msg: 'unauthorized' });
  }
  try {
    let payload: JwtPayload = jwt.verify(token, jwtSecret) as JwtPayload;
    if (payload) {
      req.id = payload.id;
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ msg: 'unauthorized' });
  }
}
