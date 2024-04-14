import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { AddressWard } from '@model';

@Injectable()
export class AddressWardRepository extends BaseRepository<AddressWard> {
  constructor(public readonly dataSource: DataSource) {
    super(AddressWard, dataSource.createEntityManager());
  }
}
