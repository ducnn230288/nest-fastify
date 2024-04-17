/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Order } from '@model';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
