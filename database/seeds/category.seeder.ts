import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';

import { Category } from '@model';

export class CategorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Category);
    const listData: Category[] = [
      {
        name: 'DELL',
        description: faker.lorem.paragraph(),
        slug: 'DELL',
        parentId: '1e525980-5242-4719-bd35-ec7b8532e9fa',
      },
      {
        name: 'ASUS',
        description: faker.lorem.paragraph(),
        slug: 'ASUS',
        parentId: '1e525980-5242-4719-bd35-ec7b8532e9fa',
      },
      {
        name: 'HP',
        description: faker.lorem.paragraph(),
        slug: 'HP',
        parentId: '1e525980-5242-4719-bd35-ec7b8532e9fa',
      },
    ];

    for (const data of listData) {
      const dataExists = await repository
        .createQueryBuilder('base')
        .andWhere(`base.name=:name`, { name: data.name })
        .getOne();

      if (!dataExists) {
        let newData = repository.create(data);
        newData = await repository.save(newData);
      }
    }
  }
}
