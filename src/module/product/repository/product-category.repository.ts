import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { ProductCategory } from '@model';

@Injectable()
export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
  constructor(public readonly dataSource: DataSource) {
    super(ProductCategory, dataSource.createEntityManager());
  }

  /**
   *
   * @param slug
   * @returns ProductCategory
   *
   */
  // async getDataBySlug(slug: string): Promise<ProductCategory | null> {
  //   console.log(slug);
  //   return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  // }

  async getDataBySlug(slug: string): Promise<ProductCategory | null> {
    return await this.createQueryBuilder('base')
      .where(`base.slug=:slug`, { slug })
      .leftJoinAndSelect('base.products', 'products')
      .withDeleted()
      .getOne();
  }
}
