import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { TaskTimesheet, User } from '@model';

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
}
