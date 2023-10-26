import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { appConfig, DbCustomLogger } from '@config';
import { MainSeeder } from './main.seeder';
import { Core1698359444654 } from './migrations/1698359444654-core';
import {
  Booking,
  Code,
  CodeType,
  Data,
  DataTranslation,
  DataType,
  DayOff,
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
    UserTeam,
    DayOff,
    Booking,
  ],
  migrations: [Core1698359444654],
  seeds: [MainSeeder],
  factories: ['database/factories/**/*{.ts,.js}'],
  logging: ['error'],
  logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
};
export const AppDataSource = new DataSource(options);
