import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { TaskWork } from '@model';

@Injectable()
export class TaskWorkRepository extends BaseRepository<TaskWork> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskWork, dataSource.createEntityManager());
  }

  async getManyByArrayId(ids: string[]): Promise<TaskWork[]> {
    const datas = await this.createQueryBuilder('base').where(`base.id IN (:...ids)`, { ids }).withDeleted().getMany();
    return datas;
  }
}
