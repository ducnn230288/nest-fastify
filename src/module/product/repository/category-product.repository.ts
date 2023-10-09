import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { CategoryProduct } from '@model';

@Injectable()
export class CategoryProductRepository extends BaseRepository<CategoryProduct> {
  constructor(public readonly dataSource: DataSource) {
    super(CategoryProduct, dataSource.createEntityManager());
  }

  /**
   *
   * @param slug
   * @returns CategoryProduct
   *
   */
  // async getDataBySlug(slug: string): Promise<CategoryProduct | null> {
  //   console.log(slug);
  //   return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  // }

  async getDataBySlug(slug: string): Promise<CategoryProduct | null> {
    return await this.createQueryBuilder('base')
      .where(`base.slug=:slug`, { slug })
      .leftJoinAndSelect('base.products', 'products')
      .withDeleted()
      .getOne();
  }
}
