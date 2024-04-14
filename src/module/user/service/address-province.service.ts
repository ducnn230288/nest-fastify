import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { AddressProvince } from '@model';
import { AddressProvinceRepository } from '../repository/address-province.repository';

@Injectable()
export class AddressProvinceService extends BaseService<AddressProvince> {
  constructor(public repo: AddressProvinceRepository) {
    super(repo);
    this.listQuery = ['name', 'code'];
    // this.listJoin = ['districtItem']
  }
}
