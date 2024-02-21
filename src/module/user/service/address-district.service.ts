import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { AddressDistrict } from '@model';

@Injectable()
export class AddressDistrictService extends BaseService<AddressDistrict> {
  constructor(
    @InjectRepository(AddressDistrict)
    public repo: Repository<AddressDistrict>,
  ) {
    super(repo);
    this.listQuery = ['name', 'code', 'codeProvince'];
    // this.listJoin = ['wardItem']
  }
}
