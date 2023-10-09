import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CategoryProduct, Product, StoreProduct } from '@model';
import { CategoryProductController, ProductController, StoreController } from '@controller';
import { CategoryProductService, ProductService, StoreService } from '@service';
import { CategoryProductRepository, ProductRepository, StoreRepository } from '@repository';
@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryProduct, StoreProduct])],
  controllers: [ProductController, CategoryProductController, StoreController],
  providers: [
    ProductService,
    CategoryProductService,
    StoreService,
    ProductRepository,
    CategoryProductRepository,
    StoreRepository,
  ],
  exports: [ProductService, CategoryProductService, ProductRepository, CategoryProductRepository],
})
export class ProductModule {}
