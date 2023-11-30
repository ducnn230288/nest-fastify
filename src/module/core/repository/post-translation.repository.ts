import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PostTranslation } from '@model';
import { BaseRepository } from '@shared';

@Injectable()
export class PostTranslationRepository extends BaseRepository<PostTranslation> {
  constructor(public readonly dataSource: DataSource) {
    super(PostTranslation, dataSource.createEntityManager());
  }

  /**
   *
   * @param slug
   * @returns PostTranslation
   *
   */
  async getDataBySlug(slug: string): Promise<PostTranslation | null> {
    return await this.createQueryBuilder('base').where(`base.slug=:slug`, { slug }).withDeleted().getOne();
  }
}
