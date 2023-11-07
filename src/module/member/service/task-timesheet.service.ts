/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { I18nContext } from 'nestjs-i18n';

import { TaskTimesheet, TaskWork, User } from '@model';
import { BaseService } from '@shared';
import { TaskRepository, TaskTimesheetRepository } from '@repository';
import { CreateTaskTimesheetRequestDto } from '@dto';
import dayjs from 'dayjs';

export const P_TASKTIMESHEET_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f68';
export const P_TASKTIMESHEET_CREAETE = '80668128-7e1d-46ef-95d1-bb4cff742f65';
export const P_TASKTIMESHEET_UPDATE = '80668128-7e1d-46ef-95d1-bb4cff742f72';
export const P_TASKTIMESHEET_DELETE = '80668128-7e1d-46ef-95d1-bb4cff742f74';
export const P_TASKTIMESHEET_DETAIL = '80668128-7e1d-46ef-95d1-bb4cff742f70';

@Injectable()
export class TaskTimesheetService extends BaseService<TaskTimesheet> {
  constructor(
    public repo: TaskTimesheetRepository,
    private repoTask: TaskRepository,
    private dataSource: DataSource,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['user'];
  }

  async checkHaveTaskTimesheet(user: User): Promise<void> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));
    const data = await this.repo.checkHaveTaskTimesheet(user.id);
    if (data) throw new BadRequestException(i18n.t('common.TaskTimesheet has been created'));
  }

  async createTaskTimesheet(user: User, body: CreateTaskTimesheetRequestDto): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    let dataTaskTimesheet: TaskTimesheet | null;

    await this.dataSource.transaction(async (entityManager) => {
      if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));
      // // kiểm tra nếu trong đã có timesheet thì ko dc check in
      await this.checkHaveTaskTimesheet(user);
      const start = new Date();

      // check list id Task
      const ids = body.listTask.map((item) => item.id);

      const listTask = await this.repoTask.getManyByArrayId(ids);
      if (listTask.length !== body.listTask.length) throw new BadRequestException(i18n.t('common.Data ids not found'));

      const task_timesheet = {
        start: start,
        userId: user.id,
      };
      dataTaskTimesheet = await this.create(task_timesheet);

      const taskWorks = listTask.map((item) => {
        return entityManager.create(TaskWork, {
          taskId: item.id,
          timesheetId: dataTaskTimesheet?.id,
        });
      });

      const dataTaskWorks = await entityManager.save(taskWorks);
    });

    return dataTaskTimesheet!;
  }
}
