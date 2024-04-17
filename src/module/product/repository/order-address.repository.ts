import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { OrderAddress } from '@model';

@Injectable()
export class OrderAddressRepository extends BaseRepository<OrderAddress> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderAddress, dataSource.createEntityManager());
  }
}
