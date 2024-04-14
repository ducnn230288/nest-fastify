import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { appConfig, DbCustomLogger } from '@config';
import { MainSeeder } from './main.seeder';
import { NamingStrategy } from '@shared';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: appConfig.DATABASE_HOST,
  port: appConfig.DATABASE_PORT,
  username: appConfig.DATABASE_USER,
  password: appConfig.DATABASE_PASSWORD,
  database: appConfig.NODE_ENV !== 'test' ? appConfig.DATABASE_NAME : 'postgres',
  entities: ['src/**/*.{entity,model}.{js,ts}'],
  migrations: ['database/migrations/**/*{.ts,.js}'],
  seeds: [MainSeeder],
  factories: ['database/factories/**/*{.ts,.js}'],
  logging: ['error'],
  logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
  namingStrategy: new NamingStrategy(),
};
export const AppDataSource = new DataSource(options);
