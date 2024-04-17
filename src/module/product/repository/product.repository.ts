import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { I18nContext } from 'nestjs-i18n';

import { BaseRepository } from '@shared';
import { Product } from '@model';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(public readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getDataBySlug(slug: string): Promise<Product | null> {
    // console.log(slug);
    return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  }

  async updateQuantity(id: string, quantity: number): Promise<Product | null> {
    const i18n = I18nContext.current()!;
    const product = await this.createQueryBuilder('base').where(`base.id=:id`, { id }).withDeleted().getOne();
    if (!product) {
      throw new BadRequestException(i18n.t('common.Data not found'));
    }
    product!.quantity -= quantity;
    return await this.save(product!);
  }

  async findProductsWitdId(listProdIds: string[]): Promise<Product[]> {
    const datas = await this.createQueryBuilder('base')
      .where(`base.id IN(:...ids)`, {
        ids: listProdIds,
      })
      .orderBy('base.createdAt', 'DESC')
      .withDeleted()
      .andWhere('base.isDeleted Is Null')
      .getMany();

    return datas;
  }

  groupByProperty(arr, property): object {
    const grouped = {};
    for (const item of arr) {
      const key = item[property]; // = "productStoreId"
      if (!grouped[key]) {
        // grouped["productStoreId"]
        grouped[key] = [];
      }
      grouped[key].push(item);
    }
    return grouped;
  }
}
