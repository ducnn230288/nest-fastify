import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductCategory, Product, ProductStore, Order, OrderAddress, OrderProduct, User } from '@model';
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
} from '@repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Product, ProductCategory, ProductStore, Order, OrderAddress, OrderProduct]),
  ],
  controllers: [ProductController, ProductCategoryController, ProductStoreController, OrderController],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductStoreService,
    ProductRepository,
    ProductCategoryRepository,
    ProductStoreRepository,
    OrderService,
    OrderAddressService,
    OrderProductService,
    OrderRepository,
    UserService,
    UserRepository,
  ],
  exports: [
    ProductService,
    ProductCategoryService,
    ProductRepository,
    ProductCategoryRepository,
    OrderService,
    OrderAddressService,
    OrderProductService,
    OrderRepository,
  ],
})
export class ProductModule {}
