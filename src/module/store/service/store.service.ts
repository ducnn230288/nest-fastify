import { Injectable } from '@nestjs/common';
import { BaseService } from '@shared';
import { Store } from '@model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(@InjectRepository(Store) public repo: Repository<Store>) {
    super(repo);
    this.listQuery = ['name', 'status', 'phone', 'description', 'slug', 'avatar'];
    this.listJoin = ['user'];
  }
}
