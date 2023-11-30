import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { CodeType } from '@model';

@Injectable()
export class CodeTypeRepository extends BaseRepository<CodeType> {
  constructor(public readonly dataSource: DataSource) {
    super(CodeType, dataSource.createEntityManager());
  }

  /**
   *
   * @param code
   * @returns CodeType
   *
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
