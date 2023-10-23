/* eslint-disable @typescript-eslint/no-unused-vars */

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { ProductCategory, Product, ProductStore, User } from '@model';
import { appConfig } from '@config';

export class ProductSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    // seed
    if (appConfig.NODE_ENV !== 'prod') {
      const repoUser = dataSource.getRepository(User);
      const user = await repoUser
        .createQueryBuilder('base')
        .andWhere(`base.email=:email`, { email: 'admin@admin.com' })
        .getOne();

      const repoCategory = dataSource.getRepository(ProductCategory);
      let resultCategory: ProductCategory;

      const repoStore = dataSource.getRepository(ProductStore);
      let resultStore: ProductStore;

      const repoProduct = dataSource.getRepository(Product);
      let resultProduct: Product;

      //seed category
      const dataCategories: ProductCategory[] = [
        await factoryManager.get(ProductCategory).make({ name: 'Thiết bị điện tử', children: [] }),
        await factoryManager.get(ProductCategory).make(),
      ];
      // const newCategory = repoCategory.create(dataCategory);
      for (let i = 0; i < 1; i++) {
        dataCategories[0].children?.push(await factoryManager.get(ProductCategory).make());
      }

      for (const { children, ...data } of dataCategories) {
        const dataExists = await repoCategory
          .createQueryBuilder('base')
          .andWhere(`base.name=:name`, { name: data.name })
          .getOne();

        if (!dataExists) {
          const newData = repoCategory.create(data);
          const parent = await repoCategory.save(newData);

          if (children?.length) {
            for (const item of children) {
              const dataExists = await repoCategory
                .createQueryBuilder('base')
                .andWhere(`base.name=:name`, { name: item.name })
                .getOne();

              if (!dataExists) {
                const newData = repoCategory.create(item);
                newData.parent = parent;
                await repoCategory.save(newData);
              }
            }
            if (!resultCategory!) resultCategory = parent;
          }
        }
      }

      //seed store
      const dataStore: ProductStore = await factoryManager.get(ProductStore).make({
        name: 'Cửa hàng điện tử',
      });
      dataStore.userId = user?.id;

      const storeExists = await repoStore
        .createQueryBuilder('base')
        .andWhere(`base.name=:name`, { name: dataStore.name })
        .getOne();

      if (!storeExists) {
        const newStore = repoStore.create(dataStore);
        resultStore = await repoStore.save(newStore);
      }

      //seed product
      const dataProduct: Product = await factoryManager.get(Product).make();
      dataProduct.productCategoryId = resultCategory!.id || '';
      dataProduct.productStoreId = resultStore!.id || '';

      const productExists = await repoProduct
        .createQueryBuilder('base')
        .andWhere(`base.name=:name`, { name: dataProduct.name })
        .getOne();

      if (!productExists) {
        const newStore = repoProduct.create(dataProduct);
        resultProduct = await repoProduct.save(newStore);
      }
    }
  }
}
