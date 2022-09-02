import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request Type:', req.method, 'Path:', req.path, 'NODE_ENV:', process.env.NODE_ENV);
  next();
}
