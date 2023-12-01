import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { QuestionTest } from '@model';

@Injectable()
export class QuestionTestRepository extends BaseRepository<QuestionTest> {
  constructor(private readonly dataSource: DataSource) {
    super(QuestionTest, dataSource.createEntityManager());
  }
}
