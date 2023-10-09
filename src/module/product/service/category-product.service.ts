import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { CategoryProduct } from '@model';
import { CategoryProductRepository } from '@repository';

export const CATEGORY_CREATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d5';
export const CATEGORY_UPDATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d6';
export const CATEGORY_DETAIL = '45f014c0-9ebe-497e-9766-2054ebb7e1d7';
export const CATEGORY_LIST = '45f014c0-9ebe-497e-9766-2054ebb7e1d8';
export const CATEGORY_DELETE = '45f014c0-9ebe-497e-9766-2054ebb7e1d9';

@Injectable()
export class CategoryProductService extends BaseService<CategoryProduct> {
  constructor(public repo: CategoryProductRepository) {
    super(repo);
    // this.listJoin = ['products'];
  }

  /**
   * @param slug
   * @returns CategoryProduct
   */
  async findSlug(slug: string): Promise<CategoryProduct | null> {
    // console.log(slug);
    const categoryProduct = await this.repo.getDataBySlug(slug);
    // console.log(categoryProduct);
    return categoryProduct;
  }
}
