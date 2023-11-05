import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { appConfig, DbCustomLogger } from '@config';
import { MainSeeder } from './main.seeder';
import { Core1698359444654 } from './migrations/1698359444654-core';
import { Member1698359719624 } from './migrations/1698359719624-member';
import {
  Booking,
  Code,
  CodeType,
  Data,
  DataTranslation,
  DataType,
  DayOff,
  File,
  Parameter,
  Post,
  PostTranslation,
  PostType,
  Province,
  District,
  Ward,
  Address,
  User,
  UserRole,
  UserTeam,
  Question,
  QuestionTest,
  Task,
  TaskTimesheet,
  TaskWork,
} from '@model';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: appConfig.DATABASE_HOST,
  port: appConfig.DATABASE_PORT,
  username: appConfig.DATABASE_USER,
  password: appConfig.DATABASE_PASSWORD,
  database: appConfig.DATABASE_NAME,
  entities: [
    Code,
    CodeType,
    Province,
    District,
    Ward,
    Address,
    User,
    UserRole,
    Data,
    DataTranslation,
    DataType,
    Parameter,
    Post,
    PostTranslation,
    PostType,
    File,
    UserTeam,
    DayOff,
    Booking,
    Question,
    QuestionTest,
    Task,
    TaskTimesheet,
    TaskWork,
  ],
  migrations: [Core1698359444654, Member1698359719624],
  seeds: [MainSeeder],
  factories: ['database/factories/**/*{.ts,.js}'],
  logging: ['error'],
  logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
};
export const AppDataSource = new DataSource(options);
