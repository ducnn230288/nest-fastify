import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { DataSource } from 'typeorm';
import { Category } from '@model';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(public readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  // async getDataBySlug(slug: string): Promise<Category | null> {
  //   return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).getOne();
  // }
}
