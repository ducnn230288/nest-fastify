import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nContext } from 'nestjs-i18n';

import { TaskWork } from '@model';
import { BaseService } from '@shared';
// import { TaskWorkRepository } from '@repository';
import {} from '@dto';
import dayjs from 'dayjs';
import { TaskWorkRepository } from '../repository/task-work.repository';

export const P_TASKWORK_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f68';
export const P_TASKWORK_CREAETE = '80668128-7e1d-46ef-95d1-bb4cff742f65';
export const P_TASKWORK_UPDATE = '80668128-7e1d-46ef-95d1-bb4cff742f72';
export const P_TASKWORK_DELETE = '80668128-7e1d-46ef-95d1-bb4cff742f74';
export const P_TASKWORK_DETAIL = '80668128-7e1d-46ef-95d1-bb4cff742f70';

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
