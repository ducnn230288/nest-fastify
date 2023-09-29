import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { appConfig, DbCustomLogger } from '@config';
import { MainSeeder } from './main.seeder';
import { member1669372347132 } from './migrations/1668566358184-member';
import {
  Code,
  CodeType,
  Data,
  DataTranslation,
  DataType,
  Parameter,
  Post,
  PostTranslation,
  PostType,
  User,
  UserRole,
  Address,
  Store,
  Province,
  District,
  Ward,
  Product,
  Category
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
    User,
    UserRole,
    Data,
    DataTranslation,
    DataType,
    Parameter,
    Post,
    PostTranslation,
    PostType,
    Address,
    Store,
    Province,
    District,
    Ward,
    Product,
    Category
  ],
  migrations: [member1669372347132],
  seeds: [MainSeeder],
  logging: ['error'],
  logger: appConfig.NODE_ENV !== 'production' ? 'advanced-console' : new DbCustomLogger(),
};
export const AppDataSource = new DataSource(options);
