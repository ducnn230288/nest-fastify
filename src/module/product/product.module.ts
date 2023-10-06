import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Product, Store } from '@model';
import { ProductController } from '@controller';
import { ProductService, StoreService } from '@service';
import { ProductRepository } from '@repository';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), StoreModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, StoreService],
  exports: [ProductService,ProductRepository],
})
export class ProductModule {}
