import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { ProductStore } from '@model';

@Injectable()
export class ProductStoreRepository extends BaseRepository<ProductStore> {
  constructor(public readonly dataSource: DataSource) {
    super(ProductStore, dataSource.createEntityManager());
  }

  async getDataBySlug(slug: string): Promise<ProductStore | null> {
    // console.log(slug);
    return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  }

  async getDateByUserId(userId: string): Promise<ProductStore | null> {
    return await this.createQueryBuilder('base').where(`base.userId=:userId`, { userId }).withDeleted().getOne();
  }
}
