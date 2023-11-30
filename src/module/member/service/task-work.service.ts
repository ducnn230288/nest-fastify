import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskWork } from '@model';
import { BaseService } from '@shared';

@Injectable()
export class TaskWorkService extends BaseService<TaskWork> {
  constructor(
    @InjectRepository(TaskWork)
    public repo: Repository<TaskWork>,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['task', 'task.project'];
  }
}
