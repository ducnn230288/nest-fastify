import { UserAdmin } from '@model';
import { Injectable } from '@nestjs/common';
import { UserAdminRepository } from '@repository';
import { BaseService } from '@shared';

export const P_USER_ADMIN_LISTED = 'd3d5b0cf-6331-401f-a693-a385d80561e7';
export const P_USER_ADMIN_DETAIL = '3eb97154-9ba6-4bdb-8c64-5b65e41c2145';
export const P_USER_ADMIN_CREATE = 'd08508c3-2880-431f-a8b7-8662d3999632';
export const P_USER_ADMIN_UPDATE = '61e8f9c2-cf09-409b-ab55-e7fb942c9b54';
export const P_USER_ADMIN_DELETE = '16fa608e-71af-445e-a499-46ac5c5b5461';

@Injectable()
export class UserAdminService extends BaseService<UserAdmin> {
  constructor(public readonly repo: UserAdminRepository) {
    super(repo);
  }
}
