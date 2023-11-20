/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { Task, TaskTimesheet, TaskWork, User } from '@model';
import { I18nContext } from 'nestjs-i18n';
import { CheckInOrOutRequestDto, CreateTaskTimesheetRequestDto, TaskWorkRequest } from '../dto/task-timesheet.dto';

@Injectable()
export class TaskTimesheetRepository extends BaseRepository<TaskTimesheet> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskTimesheet, dataSource.createEntityManager());
  }

  async checkHaveTaskTimesheet(userId: string): Promise<TaskTimesheet | null> {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const data = await this.createQueryBuilder('base')
      .andWhere(`base.userId=:userId`, { userId })
      .andWhere(`DATE(base.start) = DATE(:currentDate)`, { currentDate })
      .getOne();
    return data;
  }

  async createWithArrayTaskWorks(userId: string, listTask: Task[]): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    let result: TaskTimesheet | null = null;

    await this.dataSource.transaction(async (entityManager) => {
      result = await entityManager.save(
        entityManager.create(TaskTimesheet, {
          start: new Date(),
          userId: userId,
        }),
      );

      if (listTask) {
        result.works = [];
        for (const item of listTask) {
          const exist = await entityManager
            .createQueryBuilder(TaskWork, 'base')
            .andWhere(`base.taskId=:taskId`, { taskId: item.id })
            .andWhere(`base.timesheetId=:timesheetId`, { timesheetId: result.id })
            .withDeleted()
            .getOne();

          if (exist) {
            throw new BadRequestException(i18n.t('common.TaskWord.id is already taken'));
          }
          const data = await entityManager.save(
            entityManager.create(TaskWork, {
              taskId: item.id,
              timesheetId: result.id,
            }),
          );
          if (data) result.works.push(data);
        }
      }
    });

    return result;
  }

  async checkoutWithArrayTaskWork(
    timesheet: TaskTimesheet,
    listTaskWork: TaskWorkRequest[],
  ): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    let result: TaskTimesheet | null;

    await this.dataSource.transaction(async (entityManager) => {
      timesheet.finish = new Date();
      // result = await this.save(timesheet);

      if (listTaskWork) {
        timesheet.works = [];
        for (const item of listTaskWork) {
          const exist = await entityManager
            .createQueryBuilder(TaskWork, 'base')
            .andWhere(`base.taskId=:taskId`, { taskId: item.taskId })
            .andWhere(`base.timesheetId=:timesheetId`, { timesheetId: timesheet.id })
            .andWhere(`base.id=:id`, { id: item.id })
            .withDeleted()
            .getOne();
          if (!exist) throw new BadRequestException(i18n.t('common.TaskWork.id was not found'));

          const data = await entityManager.save(
            await entityManager.preload(TaskWork, {
              id: item.id,
              hours: item.hours,
            }),
          );

          let task = await entityManager.preload(Task, {
            id: data?.taskId,
          });
          task!.hours! += data!.hours!;
          task = await entityManager.save(task);

          if (data) timesheet.works.push(data);
        }
      }
      result = await this.save(timesheet);
    });

    return result!;
  }
}
