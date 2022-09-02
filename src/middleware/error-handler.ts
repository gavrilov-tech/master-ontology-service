import { Request, Response, NextFunction } from 'express';

import { HTTP_CODES, HTTP_STATUS_TEXT } from '../constants';
import { AppError } from '../models';

export function errorHandler (error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (error instanceof AppError) {
    res.status(error.status).send(error.statusText);
  } else {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(HTTP_STATUS_TEXT[HTTP_CODES.INTERNAL_SERVER_ERROR]);
  }
}
