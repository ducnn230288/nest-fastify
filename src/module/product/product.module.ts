import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductCategory, Product, ProductStore, Order, OrderAddress, OrderProduct } from '@model';
import { OrderController, ProductCategoryController, ProductController, ProductStoreController } from '@controller';
import {
  ProductCategoryService,
  ProductService,
  ProductStoreService,
  OrderService,
  OrderAddressService,
  OrderProductService,
} from '@service';
import { ProductCategoryRepository, ProductRepository, ProductStoreRepository, OrderRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory, ProductStore, Order, OrderAddress, OrderProduct])],
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
