import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Address } from '@model';

@Injectable()
export class AddressRepository extends BaseRepository<Address> {
  constructor(public readonly dataSource: DataSource) {
    super(Address, dataSource.createEntityManager());
  }
}
