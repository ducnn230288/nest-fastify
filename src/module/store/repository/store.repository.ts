import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { DataSource } from 'typeorm';
import { Store } from '@model';

@Injectable()
export class StoreRepository extends BaseRepository<Store> {
  constructor(public readonly dataSource: DataSource) {
    super(Store, dataSource.createEntityManager());
  }

  async getDataBySlug(slug: string): Promise<Store | null> {
    // console.log(slug);
    return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  }

  async getDateByUserId(userId: string): Promise<Store | null> {
    return await this.createQueryBuilder('base').where(`base.userId=:userId`, { userId }).withDeleted().getOne();
  }
}
