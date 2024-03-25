import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { Task, TaskTimesheet, TaskWork } from '@model';
import { I18nContext } from 'nestjs-i18n';
import { TaskWorkRequest } from '@dto';

@Injectable()
export class TaskTimesheetRepository extends BaseRepository<TaskTimesheet> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskTimesheet, dataSource.createEntityManager());
  }

  async checkHaveTaskTimesheetInDay(userId: string, listJoin: string[] = []): Promise<TaskTimesheet | null> {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const request = this.createQueryBuilder('base')
      .andWhere(`base.userId=:userId`, { userId })
      .andWhere(`DATE(base.start) = DATE(:currentDate)`, { currentDate });

    if (listJoin.length) {
      listJoin.forEach((key) => {
        const checkKey = key.split('.');
        request.leftJoinAndSelect(
          `${checkKey.length === 1 ? 'base.' + checkKey[0] : key}`,
          checkKey[checkKey.length - 1],
        );
      });
    }
    return await request.getOne();
  }

  async checkIn(userId: string, listTask: Task[]): Promise<TaskTimesheet | null> {
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

  async checkOut(
    timesheet: TaskTimesheet,
    listTaskWork: TaskWorkRequest[],
    note: string = '',
  ): Promise<TaskTimesheet | null> {
    const i18n = I18nContext.current()!;
    let result: TaskTimesheet | null;
    let task: Task;

    const sumHours = listTaskWork.reduce((init, curr) => init + curr!.hours!, 0);
    if (sumHours < 7 * 60 * 60 && !note)
      throw new BadRequestException(i18n.t('common.TaskTimesheet note was not found'));

    await this.dataSource.transaction(async (entityManager) => {
      timesheet.finish = new Date();
      // result = await this.save(timesheet);

      if (listTaskWork) {
        timesheet.works = [];
        for (const item of listTaskWork) {
          const exist = await entityManager
            .createQueryBuilder(TaskWork, 'base')
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

          task = (await entityManager.preload(Task, {
            id: data?.taskId,
          })) as Task;

          if (data) timesheet.works.push(data);
          task!.hours! += data?.hours ? data!.hours! : 0;
          task = await entityManager.save(task);
        }

        timesheet.note = note;
      }
      result = await this.save(timesheet);
    });

    return result!;
  }
}
