import { Response, Request, NextFunction, RequestHandler } from 'express';

import RateLimit, { Store } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { RedisClient } from 'redis';

import ErroBackend from '../models/BackendError';

import * as redisService from '../services/redis';
import logger from '../services/logger';

export interface RequestLimitOptions {
  code?: number;
  interval?: number;
  max?: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}

const CODE = 429;
const INTERVAL = 1 * 60 * 1000;
const MAX = 10;
const MESSAGE = 'Request limit reached';
const KEY_GENERATOR = (req: Request): string =>
  req.user ? req.user.email : req.ip;

let redisStore: Store;
let redisClient: RedisClient;

redisService
  .createClient()
  .then((_redisClient: RedisClient) => {
    redisClient = _redisClient;

    redisStore = new (RedisStore as any)({
      client: redisClient,
    });
  })
  .catch(err => {
    throw err;
  });

const requestLimit = (
  req: Request,
  res: Response,
  next: NextFunction,
  options?: RequestLimitOptions
): RequestHandler => {
  if (redisClient && redisStore) {
    let code = CODE;
    let interval = INTERVAL;
    let max = MAX;
    let message = MESSAGE;
    let keyGenerator = KEY_GENERATOR;

    if (options) {
      code = options!.code ? options!.code : CODE;
      interval = options!.interval ? options!.interval : INTERVAL;
      max = options!.max ? options!.max : MAX;
      message = options!.message ? options!.message : MESSAGE;
      keyGenerator = options!.keyGenerator
        ? options!.keyGenerator
        : KEY_GENERATOR;
    }

    return new RateLimit({
      statusCode: code,
      windowMs: interval,
      max: max,
      message: message,
      keyGenerator: keyGenerator,
      store: redisStore,
      handler: (req: Request, res: Response, next: NextFunction) =>
        next(new ErroBackend(code, message)),
      onLimitReached: () => logger.debug('Request limit reached'),
    });
  }

  return (req: Request, res: Response, next: NextFunction) => {};
};

export default limitarRequisicoes;
