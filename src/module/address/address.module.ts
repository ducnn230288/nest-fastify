import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {  } from '@controller';
import { Address, Province, District, Ward } from '@model';
import {  } from '@service';
import {  } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Province, District, Ward])],
  controllers: [],
  providers: [
    
  ],
})

export class AddressModule {}