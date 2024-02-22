import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { CodeType } from '@model';

/**
 * Injectable decorator marks a class as available to the dependency injection system.
 */
@Injectable()
export class CodeTypeRepository extends BaseRepository<CodeType> {
  /**
   * Constructor for CodeTypeRepository class.
   * @param dataSource The data source used for retrieving data.
   */
  constructor(public readonly dataSource: DataSource) {
    super(CodeType, dataSource.createEntityManager());
  }

  /**
   * Retrieves data by code and joins related items.
   * @param code The code used for filtering data.
   * @returns A promise that resolves to a CodeType object or null if not found.
   */
  async getDataByCodeJoinItems(code: string): Promise<CodeType | null> {
    return await this.createQueryBuilder('base')
      .where('base.code=:code', { code })
      .leftJoinAndMapMany('base.items', 'Code', 'code', 'base.code = code.type')
      .addOrderBy('code.createdAt', 'ASC')
      .withDeleted()
      .getOne();
  }
}
