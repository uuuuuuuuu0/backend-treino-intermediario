import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.use('/docs', express.static(path.join(__dirname, '..', '..', '..', '..', 'docs')));

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333}`);
});
