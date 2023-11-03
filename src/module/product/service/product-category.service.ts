import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { ProductCategory } from '@model';
import { ProductCategoryRepository } from '@repository';

export const CATEGORY_CREATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d5';
export const CATEGORY_UPDATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d6';
export const CATEGORY_DETAIL = '45f014c0-9ebe-497e-9766-2054ebb7e1d7';
export const CATEGORY_LIST = '45f014c0-9ebe-497e-9766-2054ebb7e1d8';
export const CATEGORY_DELETE = '45f014c0-9ebe-497e-9766-2054ebb7e1d9';

@Injectable()
export class ProductCategoryService extends BaseService<ProductCategory> {
  constructor(public repo: ProductCategoryRepository) {
    super(repo);
    this.listQuery = ['name', 'slug'];
    this.listJoin = ['products'];
  }

  /**
   * @param slug
   * @returns ProductCategory
   */
  async findSlug(slug: string): Promise<ProductCategory | null> {
    // console.log(slug);
    const productCategory = await this.repo.getDataBySlug(slug);
    // console.log(productCategory);
    return productCategory;
  }
}
