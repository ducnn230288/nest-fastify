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
        categoryId: '1e525980-5242-4719-bd35-ec7b8532e9fa',
        storeId: 'b366c230-330f-4f37-acd5-034b648e726a',
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
        categoryId: '1e525980-5242-4719-bd35-ec7b8532e9fa',
        storeId: 'b366c230-330f-4f37-acd5-034b648e726a',
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
        categoryId: '1e525980-5242-4719-bd35-ec7b8532e9fa',
        storeId: 'b366c230-330f-4f37-acd5-034b648e726a',
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
