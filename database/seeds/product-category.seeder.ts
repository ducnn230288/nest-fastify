import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';

import { ProductCategory, Product } from '@model';

export class ProductCategorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    /* const dataProductCategory: ProductCategory = {
      name: 'Thiệt bị điện tử',
      slug: faker.lorem.slug(),
      description: faker.lorem.paragraph(),
    };

    const repoProductCategory = dataSource.getRepository(ProductCategory);
    const dataProductCategoryExists = await repoProductCategory
      .createQueryBuilder('base')
      .andWhere(`base.name=:name`, { name: dataProductCategory.name })
      .getOne();

    if (!dataProductCategoryExists) {
      const newDataProductCategory = repoProductCategory.create(dataProductCategory);
      await repoProductCategory.save(newDataProductCategory);
      const repository = dataSource.getRepository(Product);
      const listDataProduct: Product[] = [
        {
          name: 'áo sơ mi',
          description: faker.lorem.paragraph(),
          quantity: 100,
          price: 100000,
          images: faker.image.avatar(),
          status: 0,
          slug: faker.lorem.slug(),
          mass: faker.number.int({ min: 0, max: 100 }),
          discount: faker.number.int({ min: 0, max: 100 }),
          productCategoryId: newDataProductCategory.id || '',
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
          discount: faker.number.int({ min: 0, max: 100 }),
          productCategoryId: newDataProductCategory.id || '',
        },
      ];

      for (const data of listDataProduct) {
        const dataExists = await repository
          .createQueryBuilder('base')
          .andWhere(`base.name=:name`, { name: data.name })
          .getOne();

        if (!dataExists) {
          let newData = repository.create(data);
          newData = await repository.save(newData);
        }
      }
    } */
  }
}
