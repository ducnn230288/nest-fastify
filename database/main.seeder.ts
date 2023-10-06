import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';

import {
  CodeSeeder,
  CodeTypeSeeder,
  DataTypeSeeder,
  ParameterSeeder,
  PostTypeSeeder,
  UserSeeder,
  StoreSeeder,
  ProvinceSeeder,
  CategoryProductSeeder,
  ProductSeeder,
} from './seeds';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, CodeTypeSeeder);
    await runSeeder(dataSource, CodeSeeder);
    await runSeeder(dataSource, DataTypeSeeder);
    await runSeeder(dataSource, ParameterSeeder);
    await runSeeder(dataSource, PostTypeSeeder);
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, ProvinceSeeder);
    // await runSeeder(dataSource, StoreSeeder);
    await runSeeder(dataSource, CategoryProductSeeder);
    // await runSeeder(dataSource, ProductSeeder);
  }
}
