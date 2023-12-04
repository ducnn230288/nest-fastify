import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { Task } from '@model';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getManyByArrayId(ids: string[]): Promise<Task[]> {
    const datas = await this.createQueryBuilder('base').where(`base.id IN (:...ids)`, { ids }).withDeleted().getMany();
    return datas;
  }

  async getManyIn30Day(): Promise<Task[]> {
    const now = dayjs(new Date());
    const datas = await this.createQueryBuilder('base')
      .orderBy('base.createdAt', 'DESC')
      .withDeleted()
      .andWhere('base.isDeleted Is Null')
      .leftJoinAndSelect('base.works', 'works')
      .andWhere(`base.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: now.subtract(30, 'day').toDate(),
        endDate: now.toDate(),
      })
      .getMany();

    return datas;
  }
}
