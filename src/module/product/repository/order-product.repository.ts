import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { DataSource } from 'typeorm';
import { OrderProduct } from '@model';

@Injectable()
export class OrderProductRepository extends BaseRepository<OrderProduct> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }
}
