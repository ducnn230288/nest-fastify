import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { DataSource } from 'typeorm';
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
}
