import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

export const logger: winston.Logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log')
    })
  ]
});

export const logStep = (step: string, details?: unknown): void => {
  const message = details != null ? `${String(step)} - ${JSON.stringify(details)}` : String(step);
  logger.info(`STEP: ${message}`);
};

export const logAction = (action: string, details?: unknown): void => {
  const message = details != null ? `${String(action)} - ${JSON.stringify(details)}` : String(action);
  logger.debug(`ACTION: ${message}`);
};

export const logError = (error: Error | string, context?: string): void => {
  const ctx = context ?? '';
  const message = error instanceof Error
    ? `${ctx} - ${error.message}\n${error.stack}`
    : `${ctx} - ${String(error)}`;
  logger.error(`ERROR: ${message}`);
};
export const logResultsTest = (name: string, context?: string): void => {
  const ctx = context ?? '';
  logger.info(`Result:  ${String(name)} - ${ctx}`);
};
