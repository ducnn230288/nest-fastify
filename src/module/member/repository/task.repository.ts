import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { Task, TaskWork, User } from '@model';
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

  async getOneTask(id: string): Promise<Task | null> {
    const data = await this.createQueryBuilder('base')
      .where(`base.id=:id`, { id })
      .leftJoinAndSelect('base.works', 'works')
      .getOne();
    return data;
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
