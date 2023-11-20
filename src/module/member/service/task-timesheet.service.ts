/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { I18n, I18nContext } from 'nestjs-i18n';

import { TaskTimesheet, TaskWork, User } from '@model';
import { BaseService, PaginationQueryDto } from '@shared';
import { TaskRepository, TaskTimesheetRepository, TaskWorkRepository } from '@repository';
import { CheckInOrOutRequestDto, CreateTaskTimesheetRequestDto } from '@dto';
import dayjs from 'dayjs';
import { TaskWorkService } from './task-work.service';

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
    private taskWorkService: TaskWorkService,
    private dataSource: DataSource,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['user'];
  }

  // async checkHaveTaskTimesheet(user: User): Promise<void> {
  //   const i18n = I18nContext.current()!;
  //   if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));
  //   const data = await this.repo.checkHaveTaskTimesheet(user.id);
  //   if (data) throw new BadRequestException(i18n.t('common.TaskTimesheet has been created'));
  // }

  async findOneTaskTimesheet(id: string): Promise<TaskTimesheet> {
    const data = await this.findOne(id);
    const [listTaskWork, count] = await this.taskWorkService.findAll({ where: [{ timesheetId: id }] });
    data!.works = listTaskWork;

    return data!;
  }

  async findAllTaskTimesheet(paginationQuery: PaginationQueryDto): Promise<[TaskTimesheet[], number]> {
    // const data = await this.findOne(id);
    // const [listTaskWork, count] = await this.taskWorkService.findAll({ where: [{ timesheetId: id }] });
    // data!.works = listTaskWork;
    const i18n = I18nContext.current()!;
    const [result, count] = await this.findAll(paginationQuery);
    await Promise.all(
      result.map(async (item) => {
        const data = await this.findOneTaskTimesheet(item!.id!);
        if (!data) {
          throw new BadRequestException(i18n.t(`common.TaskWorks is not found`));
        }
        item.works = data.works;
      }),
    );
    return [result, count];
  }

  async checkInOrOut(checkIn: boolean, user: User, body: CheckInOrOutRequestDto): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    let dataTaskTimesheet: TaskTimesheet | null;
    if (!user.id) throw new BadRequestException(i18n.t('common.User id not found', { args: { id: user.id } }));

    const timesheet = await this.repo.checkHaveTaskTimesheet(user.id);

    if (checkIn) {
      if (timesheet) throw new BadRequestException(i18n.t('common.TaskTimesheet has been created'));
      const start = new Date();

      const ids = body.listTask!.map((item) => item.id);
      const listTask = await this.repoTask.getManyByArrayId(ids);
      if (listTask.length !== body.listTask!.length) throw new BadRequestException(i18n.t('common.Data ids not found'));
      dataTaskTimesheet = await this.repo.createWithArrayTaskWorks(start, user.id, listTask);
    } else {
      if (!timesheet) throw new BadRequestException(i18n.t('common.TaskTimesheet not found'));
      if (timesheet.finish) throw new BadRequestException(i18n.t('common.TaskTimesheet has been finished'));
      // Check Out
      const finish = new Date();
      dataTaskTimesheet = await this.repo.checkoutWithArrayTaskWork(timesheet!, body.listTaskWork!, finish);
    }
    // dataTaskTimesheet = await this.findOneTaskTimesheet(dataTaskTimesheet!.id! as string);
    return dataTaskTimesheet!;
  }
}
