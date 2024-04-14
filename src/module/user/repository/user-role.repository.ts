import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UserRole } from '@model';
import { BaseRepository } from '@shared';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor(public readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }
}
