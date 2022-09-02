import multer from 'multer';
import { Request } from 'express';

global.__basedir = __dirname;

const storage = multer.diskStorage({
  destination (req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    callback(null, `${__basedir}/uploads`);
  },
  filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    callback(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
})

const csvFilter = (req: Request, file: Express.Multer.File, callback: (error: (Error | null), result: boolean) => void) => {
  if (file.mimetype.includes('csv')) {
    callback(null, true);
  } else {
    callback(new Error('Error file type'), false);
  }
}

export const multerStore = multer({ storage, fileFilter: csvFilter });
