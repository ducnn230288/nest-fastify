import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetailPrice } from './model/retail-price.model';
import { RetailPriceService } from './service/retail-price.service';
import { RetailPriceController } from './controller/retail-price.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RetailPrice])],
  controllers: [RetailPriceController],
  providers: [RetailPriceService],
  exports: [],
})
export class RetailPriceModule {}
