import { Logger as LoggerNest } from '@nestjs/common';
import { Logger } from 'typeorm';

import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { appConfig } from './config';

const consoleTransportOptions: ConsoleTransportOptions = {
  format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
  level: appConfig.LOG_LEVEL_CONSOLE,
};
const fileTransportOptions: DailyRotateFile.DailyRotateFileTransportOptions = {
  format: winston.format.combine(winston.format.timestamp(), winston.format.splat(), winston.format.json()),
  filename: 'application-%DATE%.log',
  dirname: './logs',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
  level: appConfig.LOG_LEVEL_FILE,
};

export const loggerOptions: winston.LoggerOptions = {
  transports: [new winston.transports.Console(consoleTransportOptions), new DailyRotateFile(fileTransportOptions)],
};
export class DbCustomLogger implements Logger {
  private logger = new LoggerNest('DbCustomLogger');
  constructor() {}
  /**
   * Logs query and parameters used in it.
   * @param {string} query - The query that was executed.
   * @param {unknown[]} [parameters] - []
   // * @param {QueryRunner} [queryRunner] - The QueryRunner instance that is used to execute queries. , queryRunner?: QueryRunner
   */
  logQuery(query: string, parameters?: unknown[]): void {
    this.logger.log('logQuery->>>:', [query, parameters]);
  }

  /**
   * Logs a failed query and parameters used for that query.
   * @param {string | Error} error - string | Error
   * @param {string} query - The query that was executed.
   * @param {unknown[]} [parameters] -
   *   // * @param {QueryRunner} [queryRunner] - The QueryRunner instance that is used to execute queries. , queryRunner?: QueryRunner
   */
  logQueryError(error: string | Error, query: string, parameters?: unknown[]): void {
    this.logger.error('logQueryError->>>:', error, query, parameters);
  }

  /**
   * Logs a query that is slow.
   * @param {number} time - The time it took to execute the query in milliseconds.
   * @param {string} query - The query that was executed.
   * @param {unknown[]} [parameters] -
   *   // * @param {QueryRunner} [queryRunner] - The QueryRunner instance that is used to execute queries. , queryRunner?: QueryRunner
   */
  logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    this.logger.warn('logQuerySlow->>>:', time, query, parameters);
  }

  /**
   * This function logs the message to the console if the queryRunner is not undefined.
   * @param {string} message - The message to be logged.
   *   // * @param {QueryRunner} [queryRunner] - The QueryRunner instance that is used to execute queries. , queryRunner?: QueryRunner
   */
  logSchemaBuild(message: string): void {
    this.logger.debug('logSchemaBuild->>>:', message);
  }

  /**
   * This function logs a message to the console, but only if the debug flag is set to true.
   * @param {string} message - The message to log.
   *   // * @param {QueryRunner} [queryRunner] - The QueryRunner instance that is used to execute queries. , queryRunner?: QueryRunner
   */
  logMigration(message: string): void {
    this.logger.debug('logMigration->>>:', message);
  }

  /**
   * If the level is info, log the message as debug, if the level is warn, log the message as warn,
   * otherwise log the message as log.
   * @param {'log' | 'info' | 'warn'} level - 'log' | 'info' | 'warn'
   * @param {unknown} message - The message to log.
   *   // * @param {QueryRunner} [queryRunner] - The QueryRunner instance that is used to execute queries. , queryRunner?: QueryRunner
   * @returns The return type is void.
   */
  log(level: 'log' | 'info' | 'warn', message: unknown): void {
    switch (level) {
      case 'info':
        return this.logger.debug(message);
      case 'warn':
        return this.logger.warn(message);
      case 'log':
      default:
        return this.logger.log(message);
    }
  }
}
