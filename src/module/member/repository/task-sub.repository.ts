import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { TaskSub } from '@model';

@Injectable()
export class TaskSubRepository extends BaseRepository<TaskSub> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskSub, dataSource.createEntityManager());
  }
}
