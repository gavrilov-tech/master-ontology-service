import { NextFunction, Request, Response } from 'express';

import { HTTP_CODES, HTTP_STATUS_TEXT } from '../constants';
import dbConnection from '../db';

export function upload (req: Request, res: Response, next: NextFunction): void {
  try {
    if(!req.body) {
      res.status(HTTP_CODES.BAD_REQUEST).send(HTTP_STATUS_TEXT[HTTP_CODES.BAD_REQUEST]);
    }

    if (req.body.length > 0) {
    const dbConnect = dbConnection.getDb();
    void dbConnect
      .collection('ontology')
      .insertMany(req.body, (err, result) => {
        if (err) {
          throw err?.message;
        }
        if (result) {
          res.sendStatus(HTTP_CODES.OK);
        }
      });
    } else {
      res.status(HTTP_CODES.BAD_REQUEST).send(HTTP_STATUS_TEXT[HTTP_CODES.BAD_REQUEST]);
    }
  } catch (error) {
    next(error);
  }
}