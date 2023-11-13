/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { I18nContext } from 'nestjs-i18n';

import { TaskTimesheet, TaskWork, User } from '@model';
import { BaseService } from '@shared';
import { TaskRepository, TaskTimesheetRepository, TaskWorkRepository } from '@repository';
import { CheckInOrOutRequestDto, CreateTaskTimesheetRequestDto } from '@dto';
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
    private repoTaskWork: TaskWorkRepository,
    private dataSource: DataSource,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['user', 'works'];
  }

  async checkHaveTaskTimesheet(user: User): Promise<void> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));
    const data = await this.repo.checkHaveTaskTimesheet(user.id);
    if (data) throw new BadRequestException(i18n.t('common.TaskTimesheet has been created'));
  }

  async checkInOrOut(checkIn: boolean, user: User, body: CheckInOrOutRequestDto): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    let dataTaskTimesheet: TaskTimesheet | null;

    if (!user.id) throw new BadRequestException(i18n.t('common.User id not found', { args: { id: user.id } }));
    // Check In
    console.log(checkIn);
    const timesheet = await this.repo.checkHaveTaskTimesheet(user.id);

    // kiểm tra nếu trong đã có timesheet thì ko dc check in

    if (checkIn) {
      if (timesheet) throw new BadRequestException(i18n.t('common.TaskTimesheet has been created'));
      const start = new Date();
      // check list id Task
      const ids = body.listTask!.map((item) => item.id);
      const listTask = await this.repoTask.getManyByArrayId(ids);
      if (listTask.length !== body.listTask!.length) throw new BadRequestException(i18n.t('common.Data ids not found'));

      dataTaskTimesheet = await this.repo.createWithArrayTaskWorks(start, user.id, listTask);
    } else {
      if (!timesheet) throw new BadRequestException(i18n.t('common.TaskTimesheet not found'));
      // Check Out
      const finish = new Date();
      dataTaskTimesheet = await this.repo.checkoutWithArrayTaskWork(timesheet!.id!, body.listTaskWork!, finish);
    }
    /*
    if (!timesheet) {
      if (!checkIn) throw new BadRequestException(i18n.t('commer.User has not created Timesheet'));
      const start = new Date();

      // check list id Task
      const ids = body.listTask!.map((item) => item.id);

      const listTask = await this.repoTask.getManyByArrayId(ids);

      if (listTask.length !== body.listTask!.length) throw new BadRequestException(i18n.t('common.Data ids not found'));

      dataTaskTimesheet = await this.repo.createWithArrayTaskWorks(start, user.id, listTask);
    } else {
      // Check Out
      const finish = new Date();
      dataTaskTimesheet = await this.repo.checkoutWithArrayTaskWork(timesheet!.id!, body.listTaskWork!, finish);
    }
    /* */
    return dataTaskTimesheet!;
  }

  // async checkout(id: string, user: User, body: CheckInOrOutRequestDto): Promise<TaskTimesheet | null> {
  //   const i18n = I18nContext.current()!;
  //   if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));

  //   const finish = new Date();
  //   const data = await this.repo.checkoutWithArrayTaskWork(id, body, finish);
  //   return data;
  // }
}
