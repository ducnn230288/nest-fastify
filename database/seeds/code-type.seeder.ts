import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { CodeType } from '@model';

export class CodeTypeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(CodeType);
    const data: CodeType = { name: 'Position', code: 'position', isPrimary: true };

    const dataExists = await repository
      .createQueryBuilder('base')
      .andWhere(`base.code=:code`, { code: data.code })
      .getOne();

    if (!dataExists) {
      const newData = repository.create(data);
      await repository.save(newData);
    }

    // const userFactory = factoryManager.get(CodeType);
    // const datas = await userFactory.saveMany(5);
    // console.log(datas);
  }
}
