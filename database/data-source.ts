import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { appConfig, DbCustomLogger } from '@config';
import { MainSeeder } from './main.seeder';
import { Core1698359444654 } from './migrations/1698359444654-core';
import {
  Code,
  CodeType,
  Data,
  DataTranslation,
  DataType,
  File,
  Parameter,
  Post,
  PostTranslation,
  PostType,
  Address,
  AddressProvince,
  AddressDistrict,
  AddressWard,
  User,
  UserRole,
} from '@model';
import { NamingStrategy } from '@shared';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: appConfig.DATABASE_HOST,
  port: appConfig.DATABASE_PORT,
  username: appConfig.DATABASE_USER,
  password: appConfig.DATABASE_PASSWORD,
  database: appConfig.NODE_ENV !== 'test' ? appConfig.DATABASE_NAME : 'postgres',
  entities: [
    Code,
    CodeType,
    Address,
    AddressProvince,
    AddressDistrict,
    AddressWard,
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
  ],
  migrations: [Core1698359444654],
  seeds: [MainSeeder],
  factories: ['database/factories/**/*{.ts,.js}'],
  logging: ['error'],
  logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
  namingStrategy: new NamingStrategy(),
};
export const AppDataSource = new DataSource(options);
