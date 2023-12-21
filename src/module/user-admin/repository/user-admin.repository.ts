import { UserAdmin } from '@model';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { DataSource } from 'typeorm';

@Injectable()
export class UserAdminRepository extends BaseRepository<UserAdmin> {
  constructor(public readonly dataSource: DataSource) {
    super(UserAdmin, dataSource.createEntityManager());
  }
}
