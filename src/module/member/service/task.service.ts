import { Injectable } from '@nestjs/common';
import { Task } from '@model';

import { BaseService } from '@shared';
import { TaskRepository } from '@repository';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(public repo: TaskRepository) {
    super(repo);
    this.listQuery = [];
    this.listJoin = [];
    this.listJoinCount = [];
  }
}
