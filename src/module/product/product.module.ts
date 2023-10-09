import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CategoryProduct, Product, ProductStore } from '@model';
import { CategoryProductController, ProductController, ProductStoreController } from '@controller';
import { CategoryProductService, ProductService, StoreService } from '@service';
import { CategoryProductRepository, ProductRepository, ProductStoreRepository } from '@repository';
@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryProduct, ProductStore])],
  controllers: [ProductController, CategoryProductController, ProductStoreController],
  providers: [
    ProductService,
    CategoryProductService,
    StoreService,
    ProductRepository,
    CategoryProductRepository,
    ProductStoreRepository,
  ],
  exports: [ProductService, CategoryProductService, ProductRepository, CategoryProductRepository],
})
export class ProductModule {}
