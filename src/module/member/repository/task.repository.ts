import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { Task, User } from '@model';
import { TaskRequest } from '@dto';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getManyByArrayId(ids: string[] | any): Promise<Task[]> {
    const datas = await this.createQueryBuilder('base').where(`base.id IN (:...ids)`, { ids }).withDeleted().getMany();
    return datas;
  }
}
