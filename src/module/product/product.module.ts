import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductCategory, Product, StoreProduct } from '@model';
import { ProductCategoryController, ProductController, StoreController } from '@controller';
import { ProductCategoryService, ProductService, StoreService } from '@service';
import { ProductCategoryRepository, ProductRepository, StoreRepository } from '@repository';
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory, StoreProduct])],
  controllers: [ProductController, ProductCategoryController, StoreController],
  providers: [
    ProductService,
    ProductCategoryService,
    StoreService,
    ProductRepository,
    ProductCategoryRepository,
    StoreRepository,
  ],
  exports: [ProductService, ProductCategoryService, ProductRepository, ProductCategoryRepository],
})
export class ProductModule {}
