import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from '@model';
import { BaseRepository } from '@shared';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   *
   * @param id
   * @param email
   * @returns User
   *
   */
  async getDataByIdAndEmail(id: string, email: string): Promise<User | null> {
    return await this.createQueryBuilder('base')
      .andWhere('base.id=:id', { id })
      .andWhere('base.email=:email', { email })
      .getOne();
  }

  /**
   *
   * @param id
   * @param email
   * @returns User
   *
   */
  async getDataByIdAndEmailJoinRole(id: string, email: string): Promise<User | null> {
    return await this.createQueryBuilder('base')
      .andWhere('base.id=:id', { id })
      .andWhere('base.email=:email', { email })
      .leftJoinAndSelect('base.role', 'role')
      .leftJoinAndSelect('base.position', 'position')
      .getOne();
  }

  /**
   *
   * @param email
   * @param otp
   * @returns User
   *
   */
  async getDataByEmailAndOTP(email: string, otp: string): Promise<User | null> {
    return await this.createQueryBuilder('base')
      .andWhere('base.email=:email', { email })
      .andWhere('base.otp=:otp', { otp })
      .getOne();
  }

  /**
   *
   * @param email
   * @returns User
   *
   */
  async getDataByEmail(email: string): Promise<User | null> {
    return await this.createQueryBuilder('base').andWhere('base.email=:email', { email }).getOne();
  }

  /**
   *
   * @param email
   * @returns User
   *
   */
  async getDataByEmailJoin(email: string): Promise<User | null> {
    return await this.createQueryBuilder('base')
      .andWhere('base.email=:email', { email })
      .leftJoinAndSelect('base.role', 'role')
      .leftJoinAndSelect('base.position', 'position')
      .getOne();
  }

  /**
   *
   * @returns User
   *
   * @param managerId
   */
  async getCountByManagerId(managerId: string): Promise<number> {
    return await this.createQueryBuilder('base').andWhere(`base.managerId = :managerId`, { managerId }).getCount();
  }

  /**
   *
   * @returns User
   *
   * @param ids
   */
  async getManyByArrayId(ids: string[]): Promise<User[]> {
    return await this.createQueryBuilder('base').where(`base.id IN (:...ids)`, { ids }).withDeleted().getMany();
  }
}
