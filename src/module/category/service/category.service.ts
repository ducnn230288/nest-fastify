import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { Category } from '@model';
import { CategoryRepository } from '@repository';

export const CATEGORY_TYPE_CREATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d5';
export const CATEGORY_TYPE_UPDATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d6';
export const CATEGORY_TYPE_DETAIL = '45f014c0-9ebe-497e-9766-2054ebb7e1d7';
export const CATEGORY_TYPE_LIST = '45f014c0-9ebe-497e-9766-2054ebb7e1d8';
export const CATEGORY_TYPE_DELETE = '45f014c0-9ebe-497e-9766-2054ebb7e1d9';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(public repo: CategoryRepository) {
    super(repo);
    // this.listJoin = ['products'];
  }

  /**
   * @param slug
   * @returns Category
   */
  async findSlug(slug: string): Promise<Category | null> {
    // console.log(slug);
    const category = await this.repo.getDataBySlug(slug);
    // console.log(category);
    return category;
  }
}
