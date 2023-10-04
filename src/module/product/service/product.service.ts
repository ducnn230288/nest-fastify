import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { Product } from '@model';
import { ProductRepository } from '@repository';

export const PRODUCT_CREATE = '55f014c0-9ebe-497e-9766-2054ebb7e1d8';
export const PRODUCT_LIST = '56f014c0-9ebe-497e-9766-2054ebb7e1d9';
export const PRODUCT_DETAIL = '57f014c0-9ebe-497e-9766-2054ebb7e1d0';
export const PRODUCT_UPDATE = '58f014c0-9ebe-497e-9766-2054ebb7e1d1';
export const PRODUCT_DELETE = '59014c0-9ebe-497e-9766-2054ebb7e1d2';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(public repo: ProductRepository) {
    super(repo);
    // this.listQuery = ['caregoryId', 'storeId'];
  }

  /**
   * @param slug
   * @returns Product
   */
  async findSlug(slug: string): Promise<Product | null> {
    // console.log(slug);
    const product = await this.repo.getDataBySlug(slug);
    // if (category?.id) return this.findOne(category.id);
    return product;
  }
}