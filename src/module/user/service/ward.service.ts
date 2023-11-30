import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { Ward } from '@model';

@Injectable()
export class WardService extends BaseService<Ward> {
  constructor(
    @InjectRepository(Ward)
    public repo: Repository<Ward>,
  ) {
    super(repo);
    this.listQuery = ['name', 'code', 'codeDistrict'];
  }
}
