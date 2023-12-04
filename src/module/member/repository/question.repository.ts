import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Question } from '@model';

@Injectable()
export class QuestionRepository extends BaseRepository<Question> {
  constructor(private readonly dataSource: DataSource) {
    super(Question, dataSource.createEntityManager());
  }
}
