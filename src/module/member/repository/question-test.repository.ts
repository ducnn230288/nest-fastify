import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Question, QuestionTest} from '@model';

@Injectable()
export class QuestionTestRepository extends BaseRepository<QuestionTest> {
  constructor(private readonly dataSource: DataSource) {
    super(QuestionTest, dataSource.createEntityManager());
  }
}
