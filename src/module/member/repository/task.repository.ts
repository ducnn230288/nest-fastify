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

  async getManyByArrayId(ids: string[] | any, listJoin: string[] = []): Promise<Task[]> {
    // const datas = this.createQueryBuilder('base').where(`base.id IN (:...ids)`, { ids }).withDeleted().getMany();
    const request = this.createQueryBuilder('base');
    if (listJoin.length) {
      listJoin.forEach((key) => {
        const checkKey = key.split('.');
        request.leftJoinAndSelect(`${checkKey.length === 1 ? 'base.' + checkKey[0] : key}`, key.replace('.', ''));
      });
    }
    const datas = await request.where(`base.id IN (:...ids)`, { ids }).withDeleted().getMany();
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
