import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';

import { Category } from '@model';

export class CategorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Category);
    const listData: Category[] = [
      {
        name: 'quần',
        description: faker.lorem.paragraph(),
        slug: faker.lorem.slug(),
      },
      {
        name: 'mũ',
        description: faker.lorem.paragraph(),
        slug: faker.lorem.slug(),
      },
      {
        name: 'áo',
        description: faker.lorem.paragraph(),
        slug: faker.lorem.slug(),
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
