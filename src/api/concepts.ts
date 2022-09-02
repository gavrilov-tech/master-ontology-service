import { NextFunction, Request, Response } from 'express';
import { AnyError, Document, ObjectId, WithId } from 'mongodb';

import { HTTP_CODES, HTTP_STATUS_TEXT } from '../constants';
import dbConnection from '../db';

export function getConcepts (req: Request, res: Response, next: NextFunction): void {
  try {
    const dbConnect = dbConnection.getDb();

    dbConnect
      .collection('ontology')
      .find({}).limit(100)
      .toArray((error: AnyError, result: WithId<Document>[] | undefined) => {
        if (error) {
          next(error);
        } else {
          res.status(HTTP_CODES.OK).json(result);
        }
      });
  } catch (error) {
    next(error);
  }
}

export function createConcept (req: Request, res: Response, next: NextFunction): void {
  try {
    if(!req.body) {
      res.status(HTTP_CODES.BAD_REQUEST).send(HTTP_STATUS_TEXT[HTTP_CODES.BAD_REQUEST]);
    }

    const dbConnect = dbConnection.getDb();

    dbConnect
      .collection('ontology')
      .insertOne(req.body, (err, result) => {
        if (err) {
          throw err?.message;
        }
        if (result) {
          res.status(HTTP_CODES.OK).json(result);
        }
      });
  } catch (error) {
    next(error);
  }
}

export function updateConcept (req: Request, res: Response, next: NextFunction): void {
  try {
    if(!req.body) {
      res.status(HTTP_CODES.BAD_REQUEST).send(HTTP_STATUS_TEXT[HTTP_CODES.BAD_REQUEST]);
    }

    const dbConnect = dbConnection.getDb();

    const newConcept = { ...req.body };
    delete newConcept._id;

    dbConnect
      .collection('ontology').findOneAndReplace(
      { _id: new ObjectId(req.body._id) },
      newConcept,
      { returnDocument: 'after' }
    )
      .then((result) => {
        res.status(HTTP_CODES.OK).json(result);
      })
      .catch((e) => {
        throw e?.message;
      });
  } catch (error) {
    next(error);
  }
}

export function deleteConcept (req: Request, res: Response, next: NextFunction): void {
  try {
    if(!req.params) {
      res.status(HTTP_CODES.BAD_REQUEST).send(HTTP_STATUS_TEXT[HTTP_CODES.BAD_REQUEST]);
    }

    const dbConnect = dbConnection.getDb();

    dbConnect
      .collection('ontology')
      .findOneAndDelete({ _id: new ObjectId(req.params.id) }, (err, result) => {
        if (err) {
          throw err?.message;
        }
        if (result) {
          res.status(HTTP_CODES.OK).json(result.value);
        }
      });
  } catch (error) {
    next(error);
  }
}