import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { Address } from '@model';
import { AddressRepository } from '@repository';

// export const P_ADDRESS_LISTED = '5d888d76-bf99-4a88-b8b8-d5aa37bdb123';
export const P_ADDRESS_CREATE = 'a9574d5e-269d-44f9-a5bb-41cf06d7bdda';
// export const P_ADDRESS_DETAIL = 'b9574d5b-269d-44f9-4a7c-41cf06d7bdda';
export const P_ADDRESS_UPDATE = '6d34b679-9c0e-123a-a2de-a11e37fadf72';
export const P_ADDRESS_DELETE = 'e21ac25b-1111-443e-9999-e593789807c9';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(public repo: AddressRepository) {
    super(repo);
    this.listQuery = ['specificAddress'];
    this.listJoin = ['provinceItem', 'districtItem', 'wardItem'];
  }
}
