import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressController } from '@controller';
import { Address } from '@model';
import { AddressService } from '@service';
import {} from '@repository';
import { AddressRepository } from './repository/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],

  providers: [AddressService, AddressRepository],
  exports: [AddressService, AddressRepository],
})
export class AddressModule {}
