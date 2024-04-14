import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { DataType } from '@model';

@Injectable()
export class DataTypeRepository extends BaseRepository<DataType> {
  constructor(private readonly dataSource: DataSource) {
    super(DataType, dataSource.createEntityManager());
  }
}
