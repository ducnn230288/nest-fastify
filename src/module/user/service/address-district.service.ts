import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { AddressDistrict } from '@model';
import { AddressDistrictRepository } from '../repository/address-district.repository';

@Injectable()
export class AddressDistrictService extends BaseService<AddressDistrict> {
  constructor(public repo: AddressDistrictRepository) {
    super(repo);
    this.listQuery = ['name', 'code', 'codeProvince'];
    // this.listJoin = ['wardItem']
  }
}
