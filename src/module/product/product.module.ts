import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Product } from '@model';
import { ProductController } from '@controller';
import { ProductService, StoreService } from '@service';
import { ProductRepository, StoreRepository } from '@repository';
import { StoreModule } from '../store/store.module';
@Module({
  imports: [StoreModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, StoreService, StoreRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
