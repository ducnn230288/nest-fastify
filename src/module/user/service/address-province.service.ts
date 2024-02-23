import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { AddressProvince } from '@model';

@Injectable()
export class AddressProvinceService extends BaseService<AddressProvince> {
  constructor(
    @InjectRepository(AddressProvince)
    public repo: Repository<AddressProvince>,
  ) {
    super(repo);
    this.listQuery = ['name', 'code'];
    // this.listJoin = ['districtItem']
  }
}
