import { Module } from '@nestjs/common';

import { OrderController, ProductCategoryController, ProductController, ProductStoreController } from '@controller';
import {
  ProductCategoryService,
  ProductService,
  ProductStoreService,
  OrderService,
  OrderAddressService,
  OrderProductService,
  UserService,
} from '@service';
import {
  ProductCategoryRepository,
  ProductRepository,
  ProductStoreRepository,
  OrderRepository,
  UserRepository,
  OrderAddressRepository,
  OrderProductRepository,
} from '@repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ProductController, ProductCategoryController, ProductStoreController, OrderController],
  providers: [
    ProductRepository,
    ProductService,
    ProductCategoryRepository,
    ProductCategoryService,
    ProductStoreService,
    ProductStoreRepository,
    OrderRepository,
    OrderService,
    OrderAddressRepository,
    OrderAddressService,
    OrderProductRepository,
    OrderProductService,
    UserService,
    UserRepository,
  ],
  exports: [
    ProductRepository,
    ProductService,
    ProductCategoryRepository,
    ProductCategoryService,
    ProductStoreService,
    ProductStoreRepository,
    OrderRepository,
    OrderService,
    OrderAddressRepository,
    OrderAddressService,
    OrderProductRepository,
    OrderProductService,
  ],
})
export class ProductModule {}
