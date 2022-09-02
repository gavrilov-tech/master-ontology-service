import express, { NextFunction, Request, Response } from 'express';
import { auth, InvalidTokenError } from 'express-oauth2-jwt-bearer';

import { createConcept, deleteConcept, getConcepts, updateConcept, upload, uploadCsvFile } from './api';
import { HTTP_CODES, HTTP_STATUS_TEXT } from './constants';
import { multerStore } from './middleware';

export const router = express.Router();

const checkJwt = auth({
  audience: `${process.env.AUTH0_AUDIENCE}`,
  issuerBaseURL: `${process.env.AUTH0_ISSUER_BASE_URL}`,
});
router.get('/api/public/concept', getConcepts);

router.all('/api/concept', checkJwt, (error: Error | InvalidTokenError, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(HTTP_CODES.UNAUTHORIZED);
    res.send(HTTP_STATUS_TEXT[HTTP_CODES.UNAUTHORIZED]);
  } else {
    next();
  }
});

router.post('/api/concept', createConcept);
router.put('/api/concept', updateConcept);
router.delete('/api/concept/:id', deleteConcept);

router.post('/api/upload', upload);
router.post('/api/upload-file', multerStore.single('file'), uploadCsvFile);