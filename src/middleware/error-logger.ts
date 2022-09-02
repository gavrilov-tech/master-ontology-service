import { Request, Response, NextFunction } from 'express';

import { AppError } from '../models';

export function errorLogger (error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', error);
  next(error);
}
