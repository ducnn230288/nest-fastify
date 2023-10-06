import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from '@model';
import { StoreService } from '@service';
import { StoreController } from '@controller';
import { StoreRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreProduct])],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [StoreService, StoreRepository],
})
export class StoreModule {}
