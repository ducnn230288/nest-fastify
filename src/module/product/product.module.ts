import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductCategory, Product, ProductStore } from '@model';
import { ProductCategoryController, ProductController, ProductStoreController } from '@controller';
import { ProductCategoryService, ProductService, ProductStoreService } from '@service';
import { ProductCategoryRepository, ProductRepository, ProductStoreRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory, ProductStore])],
  controllers: [ProductController, ProductCategoryController, ProductStoreController],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductStoreService,
    ProductRepository,
    ProductCategoryRepository,
    ProductStoreRepository,
  ],
  exports: [ProductService, ProductCategoryService, ProductRepository, ProductCategoryRepository],
})
export class ProductModule {}
