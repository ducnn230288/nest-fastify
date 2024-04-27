import { Injectable } from '@nestjs/common';

import { TaskSub } from '@model';
import { BaseService } from '@shared';
import { TaskSubRepository } from '@repository';

export const P_TASKSUB_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f99';
export const P_TASKSUB_CREATE = '80668128-7e1d-46ef-95d1-bb4cff742f98';
export const P_TASKSUB_UPDATE = '80668128-7e1d-46ef-95d1-bb4cff742f97';
export const P_TASKSUB_DELETE = '80668128-7e1d-46ef-95d1-bb4cff742f95';
export const P_TASKSUB_DETAIL = '80668128-7e1d-46ef-95d1-bb4cff742f94';

@Injectable()
export class TaskSubService extends BaseService<TaskSub> {
  constructor(public repo: TaskSubRepository) {
    super(repo);
    this.listQuery = [];
    this.listJoin = [];
  }
}
