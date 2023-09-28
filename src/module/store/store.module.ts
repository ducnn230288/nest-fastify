import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '@model';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [],
  controllers: [],
})
export class StoreModule {}
