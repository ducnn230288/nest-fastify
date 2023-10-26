import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';

import { CodeTypeSeeder, DataTypeSeeder, ParameterSeeder, PostTypeSeeder, UserSeeder, ProvinceSeeder } from './seeds';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, CodeTypeSeeder);
    await runSeeder(dataSource, DataTypeSeeder);
    await runSeeder(dataSource, ParameterSeeder);
    await runSeeder(dataSource, PostTypeSeeder);
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, ProvinceSeeder);
  }
}
