import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { Room } from '@model';
import { DataSource } from 'typeorm';

@Injectable()
export class RoomRepository extends BaseRepository<Room> {
  constructor(public readonly dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  /**
   *
   * @returns Building
   *
   */
  async getCountByBuilding(id: number) {
    return await this.createQueryBuilder('base')
      .andWhere('base.isPublic = TRUE')
      .andWhere('base.buildingId=:id', {
        id,
      })
      .getCount();
  }
}
