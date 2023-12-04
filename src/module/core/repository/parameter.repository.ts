import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { Parameter } from '@model';
import { DataSource } from 'typeorm';

@Injectable()
export class ParameterRepository extends BaseRepository<Parameter> {
  constructor(public readonly dataSource: DataSource) {
    super(Parameter, dataSource.createEntityManager());
  }

  /**
   *
   * @param code
   * @returns Parameter
   *
   */
  async getDataByCode(code: string): Promise<Parameter | null> {
    return await this.createQueryBuilder('base')
      .where(`base.code=:code`, { code })
      .addOrderBy('base.createdAt', 'ASC')
      .withDeleted()
      .getOne();
  }
}
