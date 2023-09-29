import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Product } from '@model';
import { ProductController } from '@controller';
import { ProductService } from '@service';
import { ProductRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
