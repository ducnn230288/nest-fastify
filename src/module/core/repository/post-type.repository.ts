import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PostType } from '@model';
import { BaseRepository } from '@shared';

@Injectable()
export class PostTypeRepository extends BaseRepository<PostType> {
  constructor(private readonly dataSource: DataSource) {
    super(PostType, dataSource.createEntityManager());
  }

  /**
   *
   * @returns PostType[]
   *
   */
  async getTree(): Promise<PostType[]> {
    return await this.dataSource.manager.getTreeRepository(PostType).findTrees();
  }
}
