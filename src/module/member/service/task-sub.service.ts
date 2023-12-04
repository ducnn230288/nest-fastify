import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskSub } from '@model';
import { BaseService, PaginationQueryDto } from '@shared';

export const P_TASKSUB_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f99';
export const P_TASKSUB_CREATE = '80668128-7e1d-46ef-95d1-bb4cff742f98';
export const P_TASKSUB_UPDATE = '80668128-7e1d-46ef-95d1-bb4cff742f97';
export const P_TASKSUB_DELETE = '80668128-7e1d-46ef-95d1-bb4cff742f95';
export const P_TASKSUB_DETAIL = '80668128-7e1d-46ef-95d1-bb4cff742f94';

@Injectable()
export class TaskSubService extends BaseService<TaskSub> {
  constructor(
    @InjectRepository(TaskSub)
    public repo: Repository<TaskSub>,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = [];
  }
}
