import { NextFunction, Request, Response } from 'express';
import { parse } from 'fast-csv';
import * as fs from 'fs';

import { HTTP_CODES, HTTP_STATUS_TEXT } from '../constants';
import dbConnection from '../db';

export function uploadCsvFile(req: Request, res: Response, next: NextFunction): void {
  try {
    if (!req.file) {
      res.status(HTTP_CODES.BAD_REQUEST).send(HTTP_STATUS_TEXT[HTTP_CODES.BAD_REQUEST]);
    }

    const csvData: any = [];
    const filePath = `${__basedir}/uploads/${req.file.filename}`;

    fs.createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        csvData.push(row);
      })
      .on('end', async () => {
        console.log('createReadStream', csvData);
        res.sendStatus(HTTP_CODES.OK);
        const dbConnect = dbConnection.getDb();
        await dbConnect
          .collection('ontology')
          .insertMany(csvData, (err, result) => {
            if (err) {
            throw err?.message;
          }
          if (result) {
            res.sendStatus(HTTP_CODES.OK);
          }
        });
      });
  } catch (error) {
    next(error);
  }
}
