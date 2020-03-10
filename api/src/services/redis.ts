import * as dotenv from 'dotenv';

import Redis, { RedisClient } from 'redis';

import logger from './logger';

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'magister';
const REDIS_DB = process.env.REDIS_DB || 0;

const CONNECTION_STRING = `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/${REDIS_DB}`;

let redisClient: RedisClient;

export const createClient = (): Promise<RedisClient> => {
  logger.info(`String de conexão Redis: ${CONNECTION_STRING}`);

  return new Promise((resolve, reject) => {
    if (redisClient) resolve(redisClient);

    try {
      redisClient = Redis.createClient(CONNECTION_STRING);

      redisClient.on('connect', () => logger.info('Redis: Conectado'));
      redisClient.on('ready', () => {
        logger.info('Redis: Pronto');
        resolve(redisClient);
      });
      redisClient.on('reconnecting', () =>
        logger.info('Redis: Reconectando...')
      );
      redisClient.on('close', () => logger.info('Redis: Desconectado'));
      redisClient.on('end', () => logger.info('Redis: Encerrado'));
      redisClient.on('error', () => logger.error('Redis: Erro'));
    } catch (err) {
      reject(new Error('Não foi possível criar o client Redis: ' + err));
    }
  });
};

export default { createClient };
