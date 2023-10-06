import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressController } from '@controller';
import { Address } from '@model';
import { AddressService } from '@service';
import {} from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],

  providers: [
    AddressService
  ],
})
export class AddressModule {}
