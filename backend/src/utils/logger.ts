import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  silent: process.env.NODE_ENV === 'test',
  transports: [new transports.Console()],
});
