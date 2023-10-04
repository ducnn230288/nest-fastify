import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { Address } from '@model';

export const P_ADDRESS_LISTED = '5d888d76-bf99-4a88-b8b8-d5aa37bdb123';
export const P_ADDRESS_CREATE = 'a9574d5e-269d-44f9-a5bb-41cf06d7bdda';
// export const P_ADDRESS_UPDATE = '6d34b679-9c0e-489a-a2de-a17e37fadf72';
// export const P_ADDRESS_DELETE = 'e21ac25b-1651-443e-9834-e593789807c9';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(
    @InjectRepository(Address)
    public repo: Repository<Address>,
  ) {
    super(repo);
    this.listQuery = ['specificAddress'];
    this.listJoin = ['provinceItem', 'districtItem', 'wardItem'];
  }
}
