import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@model';
import { StoreService } from '@service';
import { StoreController } from '@controller';
import { StoreRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [StoreService, StoreRepository],
})
export class StoreModule {}
