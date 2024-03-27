import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { Building } from '@model';
import { DataSource } from 'typeorm';

@Injectable()
export class BuildingRepository extends BaseRepository<Building> {
  constructor(public readonly dataSource: DataSource) {
    super(Building, dataSource.createEntityManager());
  }

  /**
   *
   * @param code
   * @returns Building
   *
   */
  async getDataByCode(code: string): Promise<Building | null> {
    return await this.createQueryBuilder('base')
      .where(`base.code=:code`, { code })
      .addOrderBy('base.createdAt', 'ASC')
      .withDeleted()
      .getOne();
  }
}
