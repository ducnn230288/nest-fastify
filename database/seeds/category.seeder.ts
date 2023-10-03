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
      // {
      //   name: 'DELL',
      //   description: faker.lorem.paragraph(),
      //   slug: 'DELL',
      //   parentId: '319603b1-472c-4ea7-8ec2-0286fa70c16d',
      // },
      // {
      //   name: 'ASUS',
      //   description: faker.lorem.paragraph(),
      //   slug: 'ASUS',
      //   parentId: '319603b1-472c-4ea7-8ec2-0286fa70c16d',
      // },
      // {
      //   name: 'HP',
      //   description: faker.lorem.paragraph(),
      //   slug: 'HP',
      //   parentId: '319603b1-472c-4ea7-8ec2-0286fa70c16d',
      // },
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
