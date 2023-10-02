import { Injectable } from '@nestjs/common';
import { BaseService } from '@shared';
import { Store } from '@model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const STORE_LISTED = 'bc0c4f13-776d-4b71-be4d-f9952734a319';
export const STORE_DETAIL = 'bcde3f3d-4c04-4f50-9d1b-c3c2e2eca6dc';
export const STORE_CREATE = 'bcc9d4e1-ba5a-4850-ad52-35ac928a61d9';
export const STORE_UPDATE = 'bc0b5f32-ddf7-4c61-b435-384fc5ac7574';
export const STORE_DELETE = 'bc2e6224-12c3-4e6c-b4e0-62495fb799bf';

@Injectable()
export class StoreService extends BaseService<Store> {
  constructor(@InjectRepository(Store) public repo: Repository<Store>) {
    super(repo);
    this.listQuery = ['name', 'status', 'phone', 'description', 'slug', 'avatar'];
    this.listJoin = ['user'];
  }
}
