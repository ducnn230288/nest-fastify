import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { OrderProduct } from '@model';

@Injectable()
export class OrderProductRepository extends BaseRepository<OrderProduct> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }
}
