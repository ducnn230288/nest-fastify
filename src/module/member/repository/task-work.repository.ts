import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { TaskWork, User } from '@model';

@Injectable()
export class TaskWorkRepository extends BaseRepository<TaskWork> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskWork, dataSource.createEntityManager());
  }

  async getManyByArrayId(ids: string[] | any): Promise<TaskWork[]> {
    const datas = await this.createQueryBuilder('base').where(`base.id IN (:...ids)`, { ids }).withDeleted().getMany();
    return datas;
  }
}
