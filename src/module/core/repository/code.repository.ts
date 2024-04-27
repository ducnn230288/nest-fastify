import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Code } from '@model';

@Injectable()
export class CodeRepository extends BaseRepository<Code> {
  constructor(private readonly dataSource: DataSource) {
    super(Code, dataSource.createEntityManager());
  }
}
