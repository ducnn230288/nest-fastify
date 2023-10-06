import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryProduct } from '@model';
import { CategoryProductRepository } from '@repository';
import { CategoryProductController } from '@controller';
import { CategoryProductService } from '@service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryProduct])],
  controllers: [CategoryProductController],
  providers: [CategoryProductRepository, CategoryProductService],
})
export class CategoryProductModule {}
