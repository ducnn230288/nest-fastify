import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { TaskTimesheet, User } from '@model';
import { BaseService, PaginationQueryDto } from '@shared';
import { DayoffRepository, TaskRepository, TaskTimesheetRepository } from '@repository';
import { CheckInRequestDto, CheckOutRequestDto, FindTaskTimesheet } from '@dto';

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
    private repoDayoff: DayoffRepository,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['user', 'works', 'works.task', 'task.project'];
  }

  async getCheckIn(user: User): Promise<TaskTimesheet | null> {
    return await this.repo.checkHaveTaskTimesheetInDay(user.id!, ['works', 'user', 'works.task']);
  }

  async checkIn(user: User, body: CheckInRequestDto): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.User id not found', { args: { id: user.id } }));

    const timesheet = await this.repo.checkHaveTaskTimesheetInDay(user.id);
    if (timesheet) throw new BadRequestException(i18n.t('common.User has been checked in'));

    const ids = body.listTask!.map((item) => item.id as string);
    const listTask = await this.repoTask.getManyByArrayId(ids);
    if (listTask.length !== body.listTask!.length) throw new BadRequestException(i18n.t('common.Data ids not found'));

    const dataTaskTimesheet = await this.repo.checkIn(user.id, listTask);
    return dataTaskTimesheet!;
  }

  async checkOut(user: User, body: CheckOutRequestDto): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.User id not found', { args: { id: user.id } }));

    const timesheet = await this.repo.checkHaveTaskTimesheetInDay(user.id);
    if (!timesheet) throw new BadRequestException(i18n.t('common.User not check in'));
    if (timesheet.finish) throw new BadRequestException(i18n.t('common.User has been checked out'));

    const dataTaskTimesheet = await this.repo.checkOut(timesheet!, body.listTaskWork!, body.note);
    return dataTaskTimesheet;
  }

  async findAllWithDayOff(paginationQuery: PaginationQueryDto): Promise<[FindTaskTimesheet[], number]> {
    const [timesheets, total] = await this.findAll(paginationQuery);
    const datas: Array<FindTaskTimesheet> = [];

    await Promise.all(
      timesheets.map(async (timesheet) => {
        const data = await this.repoDayoff.findDayoffWithTaskTimesheet(timesheet, []);
        datas.push(Object.assign(timesheet, { dayoff: data }));
      }),
    );
    return [datas, total];
  }

  async findOneWithDayOff(id: string): Promise<FindTaskTimesheet> {
    const timesheet = await this.findOne(id, []);
    const dayoff = await this.repoDayoff.findDayoffWithTaskTimesheet(timesheet!);

    const data = Object.assign(timesheet!, { dayoff: dayoff });
    return data;
  }
}
