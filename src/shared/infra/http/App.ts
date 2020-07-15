import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';
import '@shared/infra/mongoose';

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import routes from './routes';

class App {
  public readonly express: Express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: '*',
        optionsSuccessStatus: 200,
      }),
    );
  }

  errors() {
    this.express.use(errors());
    this.express.use(
      (err: Error, req: Request, res: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        return res.status(500).json({
          status: 'error',
          message: 'Internal server error.',
        });
      },
    );
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
