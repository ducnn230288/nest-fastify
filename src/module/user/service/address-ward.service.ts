import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { AddressWard } from '@model';

@Injectable()
export class AddressWardService extends BaseService<AddressWard> {
  constructor(
    @InjectRepository(AddressWard)
    public repo: Repository<AddressWard>,
  ) {
    super(repo);
    this.listQuery = ['name', 'code', 'codeDistrict'];
  }
}
