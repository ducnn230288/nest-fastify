import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PostType } from '@model';
import { BaseRepository } from '@shared';

/**
 * Injectable decorator to provide dependencies for the class
 */
@Injectable()
export class PostTypeRepository extends BaseRepository<PostType> {
  /**
   * Constructor for PostTypeRepository class
   * @param dataSource - The data source for PostTypeRepository
   */
  constructor(private readonly dataSource: DataSource) {
    super(PostType, dataSource.createEntityManager());
  }

  /**
   * Retrieves the tree structure of PostTypes
   * @returns A Promise that resolves to an array of PostType objects representing the tree structure
   */
  async getTree(): Promise<PostType[]> {
    return await this.dataSource.manager.getTreeRepository(PostType).findTrees();
  }
}
