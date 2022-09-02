import express, { Express } from 'express';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import dbConnection from './db';
import { errorHandler, errorLogger, logger } from './middleware';
import { router } from './router';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

/**
 * Set Variables
 */

const PORT: string = process.env.PORT || '80';

const app: Express = express();

/**
 *  Configuration
 */

app.use(compression());

app.use(cors());
app.use(express.json());

app.use(logger);

app.use('/', router);

/**
 *  Error handler
 */

app.use(errorLogger);
app.use(errorHandler);

/**
 * MongoDB connection
 */

dbConnection.connectToDb((err: any) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  /**
   * Server Activation
   */
  app.listen(PORT, () => console.log(`service is listening on localhost: ${PORT}`));
});

