import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { AddressWard } from '@model';
import { AddressWardRepository } from '../repository/address-ward.repository';

@Injectable()
export class AddressWardService extends BaseService<AddressWard> {
  constructor(public repo: AddressWardRepository) {
    super(repo);
    this.listQuery = ['name', 'code', 'codeDistrict'];
  }
}
