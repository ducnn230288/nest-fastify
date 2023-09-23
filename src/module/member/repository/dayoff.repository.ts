import { Injectable } from '@nestjs/common';
import { Brackets, DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { BaseRepository } from '@shared';
import { DayOff } from '@model';

@Injectable()
export class DayoffRepository extends BaseRepository<DayOff> {
  constructor(private readonly dataSource: DataSource) {
    super(DayOff, dataSource.createEntityManager());
  }

  /**
   *
   * @param staffId
   * @returns number
   *
   */
  async getCountWaitByStaffId(staffId: string): Promise<number> {
    return await this.createQueryBuilder('base')
      .where(`base.status = :status`, { status: 0 })
      .andWhere(`base.staffId = :staffId`, { staffId })
      .getCount();
  }

  /**
   *
   * @param staffId
   * @param type
   * @returns number
   *
   */
  async getCountWaitByStaffIdWithType(staffId: string, type: number = 1): Promise<number> {
    return await this.createQueryBuilder('base')
      .where(`base.status = :status`, { status: 0 })
      .andWhere(`base.staffId = :staffId`, { staffId })
      .andWhere(`base.type = :type`, { type })
      .getCount();
  }

  /**
   *
   * @param managerId
   * @returns number
   *
   */
  async getCountWaitByManagerId(managerId: string): Promise<number> {
    return await this.createQueryBuilder('base')
      .where(`base.status = :status`, { status: 0 })
      .andWhere(`base.managerId = :managerId`, { managerId })
      .getCount();
  }

  /**
   *
   * @param staffId
   * @returns DayOff[]
   *
   */
  async getManyDayOffThisYearByStaffId(staffId: string, type: number = 1): Promise<DayOff[]> {
    const now = dayjs();
    return await this.createQueryBuilder('base')
      .andWhere(`base.staffId=:staffId`, { staffId })
      .andWhere(`base.type=:type`, { type })
      .andWhere(`base.status != :status`, { status: -1 })
      .andWhere(`"dateLeaveStart" BETWEEN :startDate AND :endDate`, {
        startDate: now.startOf('year').toDate(),
        endDate: now.endOf('year').toDate(),
      })
      .andWhere(`"dateLeaveEnd" BETWEEN :startDate AND :endDate`, {
        startDate: now.startOf('year').toDate(),
        endDate: now.endOf('year').toDate(),
      })
      .getMany();
  }

  /**
   *
   * @param staffId
   * @param type
   * @returns DayOff[]
   *
   */
  async getManyDayOffThisMonthByStaffId(staffId: string, type: number = 1): Promise<DayOff[]> {
    const now = dayjs();
    return await this.createQueryBuilder('base')
      .andWhere(`base.staffId=:staffId`, { staffId })
      .andWhere(`base.type=:type`, { type })
      .andWhere(`base.status != :status`, { status: -1 })
      .andWhere(`"dateLeaveStart" BETWEEN :startDate AND :endDate`, {
        startDate: now.startOf('month').toDate(),
        endDate: now.endOf('month').toDate(),
      })
      .andWhere(`"dateLeaveEnd" BETWEEN :startDate AND :endDate`, {
        startDate: now.startOf('month').toDate(),
        endDate: now.endOf('month').toDate(),
      })
      .getMany();
  }

  /**
   *
   * @param staffId
   * @param dateLeaveStart
   * @param dateLeaveEnd
   * @returns number
   *
   */
  async getCountWaitByDateLeaveAndStaffId(staffId: string, dateLeaveStart: Date, dateLeaveEnd: Date): Promise<number> {
    return await this.createQueryBuilder('base')
      .orWhere(
        new Brackets((qb) => {
          qb.andWhere('base.staffId = :staffId', { staffId })
            // .andWhere('base.type = :type', { type: 1 })
            .andWhere('base.status = :status', { status: 0 })
            .andWhere(`"dateLeaveStart" BETWEEN :startDate AND :endDate`, {
              startDate: dayjs(dateLeaveStart).startOf('days').toDate(),
              endDate: dayjs(dateLeaveEnd).endOf('days').toDate(),
            });
        }),
      )
      .orWhere(
        new Brackets((qb) => {
          qb.andWhere('base.staffId = :staffId', { staffId })
            // .andWhere('base.type = :type', { type: 1 })
            .andWhere('base.status = :status', { status: 0 })
            .andWhere(`"dateLeaveEnd" BETWEEN :startDate AND :endDate`, {
              startDate: dayjs(dateLeaveStart).startOf('days').toDate(),
              endDate: dayjs(dateLeaveEnd).endOf('days').toDate(),
            });
        }),
      )
      .getCount();
  }

  /**
   *
   * @param staffId
   * @param dateLeaveStart
   * @param dateLeaveEnd
   * @returns DayOff[]
   *
   */
  async getManyWaitByDateLeaveAndStaffId(staffId: string, dateLeaveStart: Date, dateLeaveEnd: Date): Promise<DayOff[]> {
    return await this.createQueryBuilder('base')
      .orWhere(
        new Brackets((qb) => {
          qb.andWhere('base.staffId = :staffId', { staffId })
            .andWhere('base.type = :type', { type: 1 })
            .andWhere('base.status = :status', { status: 0 })
            .andWhere(`"dateLeaveStart" BETWEEN :startDate AND :endDate`, {
              startDate: dayjs(dateLeaveStart).subtract(30, 'days').startOf('days').toDate(),
              endDate: dayjs(dateLeaveEnd).endOf('days').toDate(),
            });
        }),
      )
      .orWhere(
        new Brackets((qb) => {
          qb.andWhere('base.staffId = :staffId', { staffId })
            .andWhere('base.type = :type', { type: 1 })
            .andWhere('base.status = :status', { status: 0 })
            .andWhere(`"dateLeaveEnd" BETWEEN :startDate AND :endDate`, {
              startDate: dayjs(dateLeaveStart).startOf('days').toDate(),
              endDate: dayjs(dateLeaveEnd).add(30, 'days').endOf('days').toDate(),
            });
        }),
      )
      .getMany();
  }

  /**
   *
   * @returns number
   *
   */
  async getCountToday(): Promise<number> {
    return await this.createQueryBuilder('base')
      .where(`"created_at" BETWEEN :startDate AND :endDate`, {
        startDate: dayjs().startOf('days').toDate(),
        endDate: dayjs().endOf('days').toDate(),
      })
      .getCount();
  }
}
