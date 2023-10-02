import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Category } from '@model';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(public readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  /**
   *
   * @param slug
   * @returns Category
   *
   */
  // async getDataBySlug(slug: string): Promise<Category | null> {
  //   console.log(slug);
  //   return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  // }

  async getDataBySlug(slug: string): Promise<Category | null> {
    return await this.createQueryBuilder('base')
      .where(`base.slug=:slug`, { slug })
      .leftJoinAndSelect('base.products', 'products')
      .withDeleted()
      .getOne();
  }
}
