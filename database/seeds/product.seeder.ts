import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';

import { Product } from '@model';

export class ProductSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Product);
    const listData: Product[] = [
      {
        name: 'áo sơ mi',
        description: faker.lorem.paragraph(),
        quantity: 100,
        price: 100000,
        images: faker.image.avatar(),
        status: 0,
        slug: faker.lorem.slug(),
        mass: faker.number.int({ min: 0, max: 100 }),
        disCount: faker.number.int({ min: 0, max: 100 }),
        categoryId: '7c5f6626-3278-474e-bbc9-25ad42158b3b',
        storeId: 'd7930781-c19b-4ee8-9709-0511be9925d6',
      },
      {
        name: 'áo khoác',
        description: faker.lorem.paragraph(),
        quantity: 100,
        price: 100000,
        images: faker.image.avatar(),
        status: 0,
        slug: faker.lorem.slug(),
        mass: faker.number.int({ min: 0, max: 100 }),
        disCount: faker.number.int({ min: 0, max: 100 }),
        categoryId: '7c5f6626-3278-474e-bbc9-25ad42158b3b',
        storeId: 'd7930781-c19b-4ee8-9709-0511be9925d6',
      },
      {
        name: 'áo thun',
        description: faker.lorem.paragraph(),
        quantity: 100,
        price: 100000,
        images: faker.image.avatar(),
        status: 0,
        slug: faker.lorem.slug(),
        mass: faker.number.int({ min: 0, max: 100 }),
        disCount: faker.number.int({ min: 0, max: 100 }),
        categoryId: '7c5f6626-3278-474e-bbc9-25ad42158b3b',
        storeId: 'd7930781-c19b-4ee8-9709-0511be9925d6',
      },
      {
        name: 'áo dai',
        description: faker.lorem.paragraph(),
        quantity: 100,
        price: 100000,
        images: faker.image.avatar(),
        status: 0,
        slug: faker.lorem.slug(),
        mass: faker.number.int({ min: 0, max: 100 }),
        disCount: faker.number.int({ min: 0, max: 100 }),
        categoryId: '7c5f6626-3278-474e-bbc9-25ad42158b3b',
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
