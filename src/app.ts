import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import createHttpError, { type HttpError } from 'http-errors';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env';

const app = express();

/** enable real origin ip behind reverse proxies */
app.enable('trust proxy');
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

/** status checkpoints */
app.get('/ping', (req: Request, res: Response) => res.sendStatus(200).end());
app.head('/ping', (req: Request, res: Response) => res.sendStatus(200).end());

/** Not Found Handler */
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new createHttpError.NotFound());
});

/** Global Error Handler */
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode ?? 500).json({
    errors: [
      {
        type: err.name,
        message: err.message ?? 'Something went wrong',
        ...(env.NODE_ENV !== 'prod' && { stack: err.stack }),
      },
    ],
  });
  next();
});

export default app;
