import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressController, ProvinceController, DistrictController, WardController } from '@controller';
import { Address, Province, District, Ward } from '@model';
import { AddressService, DistrictService, ProvinceService, WardService } from '@service';
import {} from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Province, District, Ward])],
  controllers: [AddressController, ProvinceController, DistrictController, WardController],

  providers: [
    AddressService,
    ProvinceService,
    DistrictService,
    WardService
  ],
})
export class AddressModule {}
