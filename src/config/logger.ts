import winston from 'winston';
import { env } from './env';

export const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'auth-service' },
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      level: 'error',
      dirname: 'logs',
      filename: 'error.log',
      silent: env.NODE_ENV !== 'prod',
    }),
    new winston.transports.File({
      dirname: 'logs',
      filename: 'app.log',
      silent: env.NODE_ENV !== 'prod',
    }),
    new winston.transports.Console({
      silent: env.NODE_ENV === 'test',
    }),
  ],
});
