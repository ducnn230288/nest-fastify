import { Injectable } from '@nestjs/common';
import { BaseService } from '@shared';
import { ProductStore } from '@model';
import { ProductStoreRepository } from '@repository';

export const STORE_LISTED = 'zz0c4f13-776d-4b71-be4d-f9952734a319';
export const STORE_DETAIL = 'zzde3f3d-4c04-4f50-9d1b-c3c2e2eca6dc';
export const STORE_CREATE = 'zzc9d4e1-ba5a-4850-ad52-35ac928a61d9';
export const STORE_UPDATE = 'zz0b5f32-ddf7-4c61-b435-384fc5ac7574';
export const STORE_DELETE = 'zz2e6224-12c3-4e6c-b4e0-62495fb799bf';

@Injectable()
export class ProductStoreService extends BaseService<ProductStore> {
  constructor(public repo: ProductStoreRepository) {
    super(repo);
    this.listQuery = ['name', 'phone', 'slug'];
    // this.listJoin = ['user'];
  }

  async getStoreByUserId(userId: string): Promise<ProductStore | null> {
    return await this.repo.getDateByUserId(userId);
  }
}
