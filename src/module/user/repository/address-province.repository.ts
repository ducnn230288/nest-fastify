import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { AddressProvince } from '@model';

@Injectable()
export class AddressProvinceRepository extends BaseRepository<AddressProvince> {
  constructor(public readonly dataSource: DataSource) {
    super(AddressProvince, dataSource.createEntityManager());
  }
}
