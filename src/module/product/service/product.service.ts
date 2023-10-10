import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { Product } from '@model';
import { ProductRepository } from '@repository';
import { ProductStoreService } from '@service';
// import { CreateProductRequestDto, ProductResponseDto } from '../dto/product.dto';
// import { ProductStoreService } from '@service';

export const PRODUCT_CREATE = '55f014c0-9ebe-497e-9766-2054ebb7e1d8';
export const PRODUCT_LIST = '56f014c0-9ebe-497e-9766-2054ebb7e1d9';
export const PRODUCT_DETAIL = '57f014c0-9ebe-497e-9766-2054ebb7e1d0';
export const PRODUCT_UPDATE = '58f014c0-9ebe-497e-9766-2054ebb7e1d1';
export const PRODUCT_DELETE = '59014c0-9ebe-497e-9766-2054ebb7e1d2';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    public repo: ProductRepository, // private storeService: ProductStoreService,
  ) {
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
    // if (productCategory?.id) return this.findOne(productCategory.id);
    return product;
  }

  // /**
  //  * @param body
  //  * @param userId
  //  * @returns Product
  //  */
  // async createProduct(body: CreateProductRequestDto, userId: string): Promise<ProductResponseDto | any> {
  //   const store = await this.storeService.getStoreByUserId(userId);
  //   const data = Object.assign(body, { storeId: store?.id });
  //   const product = await this.repo.create(data);
  //   return product;
  // }
}
