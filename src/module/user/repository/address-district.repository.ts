import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { AddressDistrict } from '@model';

@Injectable()
export class AddressDistrictRepository extends BaseRepository<AddressDistrict> {
  constructor(public readonly dataSource: DataSource) {
    super(AddressDistrict, dataSource.createEntityManager());
  }
}
