import { Injectable } from '@nestjs/common';

import { TaskWork } from '@model';
import { BaseService } from '@shared';
import { TaskWorkRepository } from '../repository/task-work.repository';

@Injectable()
export class TaskWorkService extends BaseService<TaskWork> {
  constructor(public repo: TaskWorkRepository) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['task', 'task.project'];
  }
}
