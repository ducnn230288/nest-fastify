import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { Province } from '@model';

@Injectable()
export class ProvinceService extends BaseService<Province> {
  constructor(
    @InjectRepository(Province)
    public repo: Repository<Province>,
  ) {
    super(repo);
    this.listQuery = ['name', 'code', 'address'];
  }
}