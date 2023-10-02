import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { Product } from '@model';
import { ProductRepository } from '@repository';

export const PRODUCT_TYPE_CREATE = '45f014c0-9ebe-497e-9766-2054ebb7e1d5';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(public repo: ProductRepository) {
    super(repo);
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
