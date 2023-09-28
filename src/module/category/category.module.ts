import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Category } from '@model';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [],
  providers: [],
})
export class CategoryModule {}
