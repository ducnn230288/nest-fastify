import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Product } from '@model';
import { ProductController } from '@controller';
import { ProductService, StoreService } from '@service';
import { ProductRepository } from '@repository';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), StoreModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, StoreService],
})
export class ProductModule {}
