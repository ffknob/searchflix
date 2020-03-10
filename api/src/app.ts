import * as dotenv from 'dotenv';

dotenv.config();

const apm = require('elastic-apm-node').start({
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'searchflix',
  serverUrl: process.env.ELASTIC_APM_SERVER_URL || 'http://localhost:8200',
  logLevel: process.env.ELASTIC_APM_LOG_LEVEL || 'info',
  logger: logger,
});

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import logger from './services/logger';

import BackendError from './models/BackendError';

import indexRouter from './routes/index';
import searchRouter from './routes/search';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

const API_VERSION = 'v1';

app.use('/', indexRouter);
app.use(`/api/${API_VERSION}/search`, searchRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new BackendError(404, 'Route not found');
  throw error;
});

app.use(
  (err: BackendError, req: Request, res: Response, next: NextFunction) => {
    apm.captureError(err);

    res.status(err.code || 500).json({
      codigo: err.code || 500,
      mensagem: err.message || 'Unknow error',
    });
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}...`);
});

export default app;
