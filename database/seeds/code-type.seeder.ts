import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { CodeType } from '@model';

export class CodeTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(CodeType);
    const listData: CodeType[] = [
      { name: 'Position', code: 'position', isPrimary: true },
      { name: 'Room', code: 'room', isPrimary: true },
    ];

    for (const data of listData) {
      const dataExists = await repository
        .createQueryBuilder('base')
        .andWhere(`base.code=:code`, { code: data.code })
        .getOne();

      if (!dataExists) {
        const newData = repository.create(data);
        await repository.save(newData);
      }
    }

    // const userFactory = await factoryManager.get(CategoryType);
    // await userFactory.save();
    // await userFactory.saveMany(5);
  }
}
