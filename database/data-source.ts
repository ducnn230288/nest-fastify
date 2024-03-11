import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { appConfig, DbCustomLogger } from '@config';
import { MainSeeder } from './main.seeder';
import { Core1698359444654 } from './migrations/1698359444654-core';
import { Product1710196497937 } from './migrations/1710196497937-product';
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
  Product,
  ProductCategory,
  ProductStore,
  Order,
  OrderProduct,
  OrderAddress,
} from '@model';

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
    ProductCategory,
    Order,
    Product,
    ProductStore,
    OrderProduct,
    OrderAddress,
  ],
  migrations: [Core1698359444654, Product1710196497937],
  seeds: [MainSeeder],
  factories: ['database/factories/**/*{.ts,.js}'],
  logging: ['error'],
  logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
};
export const AppDataSource = new DataSource(options);
