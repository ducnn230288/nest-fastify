import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { TaskTimesheet, User } from '@model';
import { BaseService } from '@shared';
import { TaskRepository, TaskTimesheetRepository } from '@repository';
import { CheckInOrOutRequestDto } from '@dto';

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
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['user', 'works', 'works.task', 'works.task.project'];
  }

  async checkInOrOut(user: User, body: CheckInOrOutRequestDto): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    let dataTaskTimesheet: TaskTimesheet | null;
    if (!user.id) throw new BadRequestException(i18n.t('common.User id not found', { args: { id: user.id } }));

    const timesheet = await this.repo.checkHaveTaskTimesheet(user.id);

    if (!timesheet) {
      const ids = body.listTask!.map((item) => item.id);
      const listTask = await this.repoTask.getManyByArrayId(ids);
      if (listTask.length !== body.listTask!.length) throw new BadRequestException(i18n.t('common.Data ids not found'));
      dataTaskTimesheet = await this.repo.checkIn(user.id, listTask);
    } else {
      if (timesheet.finish) throw new BadRequestException(i18n.t('common.TaskTimesheet has been finished'));
      dataTaskTimesheet = await this.repo.checkOut(timesheet!, body.listTaskWork!, body.note);
    }

    // if (checkIn) {
    //   if (timesheet) throw new BadRequestException(i18n.t('common.TaskTimesheet has been created'));
    //   const start = new Date();

    //   const ids = body.listTask!.map((item) => item.id);
    //   const listTask = await this.repoTask.getManyByArrayId(ids);
    //   if (listTask.length !== body.listTask!.length) throw new BadRequestException(i18n.t('common.Data ids not found'));
    //   dataTaskTimesheet = await this.repo.checkIn(user.id, listTask);
    // } else {
    //   if (!timesheet) throw new BadRequestException(i18n.t('common.TaskTimesheet not found'));
    //   if (timesheet.finish) throw new BadRequestException(i18n.t('common.TaskTimesheet has been finished'));
    //   // Check Out
    //   const finish = new Date();
    //   dataTaskTimesheet = await this.repo.checkOut(timesheet!, body.listTaskWork!);
    // }
    // dataTaskTimesheet = await this.findOneTaskTimesheet(dataTaskTimesheet!.id! as string);
    return dataTaskTimesheet!;
  }
}
