import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { District } from '@model';

@Injectable()
export class DistrictService extends BaseService<District> {
  constructor(
    @InjectRepository(District)
    public repo: Repository<District>,
  ) {
    super(repo);
    this.listQuery = ['name', 'code', 'codeProvince'];
    // this.listJoin = ['wardItem']
  }
}