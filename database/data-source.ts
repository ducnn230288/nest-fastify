import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { appConfig, DbCustomLogger } from '@config';
import { MainSeeder } from './main.seeder';
import { member1669372347132 } from './migrations/1668566358184-member';
import {
  Address,
  CategoryProduct,
  Code,
  CodeType,
  Data,
  DataTranslation,
  DataType,
  Order,
  Parameter,
  Post,
  PostTranslation,
  PostType,
  Product,
  Store,
  User,
  UserRole,
  Province,
  District,
  Ward,
  OrderProduct,
} from '@model';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: appConfig.DATABASE_HOST,
  port: appConfig.DATABASE_PORT,
  username: appConfig.DATABASE_USER,
  password: appConfig.DATABASE_PASSWORD,
  database: appConfig.DATABASE_NAME,
  entities: [
    Address,
    CategoryProduct,
    Order,
    Product,
    Store,
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
    Province,
    District,
    Ward,
    OrderProduct,
  ],
  migrations: [member1669372347132],
  seeds: [MainSeeder],
  logging: ['error'],
  logger: appConfig.NODE_ENV !== 'production' ? 'advanced-console' : new DbCustomLogger(),
};
export const AppDataSource = new DataSource(options);
