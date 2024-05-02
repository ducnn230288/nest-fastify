import { Injectable } from '@nestjs/common';

import { Room } from '@model';
import { RoomRepository } from '@repository';
import { BaseService } from '@shared';

export const P_ROOM_LISTED = 'd278abcb-1956-4b45-95c1-2ab612110ec6';
export const P_ROOM_CREATE = 'd9185449-e2ac-4e72-9c9f-25788c23d5ba';
export const P_ROOM_UPDATE = '3d478437-949b-4ae7-9c21-79cabb1663a3';
export const P_ROOM_DELETE = '275ebda7-3e03-4c93-b352-baa7705528aa';

@Injectable()
export class RoomService extends BaseService<Room> {
  constructor(public repo: RoomRepository) {
    super(repo);
    this.listQuery = ['name'];
    this.listJoin = ['roomSupplies', 'utilities'];
    this.listInnerJoin = [];
  }

  /**
   *
   * @returns Building
   *
   */
  // async findOne(): Promise<any> {
  //   return this.repo.getBuildings();
  // }
}
