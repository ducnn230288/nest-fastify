import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { TaskWork, User } from '@model';

@Injectable()
export class TaskWorkRepository extends BaseRepository<TaskWork> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskWork, dataSource.createEntityManager());
  }
}
