import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { DataSource } from 'typeorm';
import { StoreProduct } from '@model';

@Injectable()
export class StoreRepository extends BaseRepository<StoreProduct> {
  constructor(public readonly dataSource: DataSource) {
    super(StoreProduct, dataSource.createEntityManager());
  }

  async getDataBySlug(slug: string): Promise<StoreProduct | null> {
    // console.log(slug);
    return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  }

  async getDateByUserId(userId: string): Promise<StoreProduct | null> {
    return await this.createQueryBuilder('base').where(`base.userId=:userId`, { userId }).withDeleted().getOne();
  }
}
