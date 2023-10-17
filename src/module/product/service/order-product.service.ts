import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared';
import { Repository } from 'typeorm';
import { OrderProduct } from '../model/order-product.model';

@Injectable()
export class OrderProductService extends BaseService<OrderProduct> {
  constructor(@InjectRepository(OrderProduct) public repo: Repository<OrderProduct>) {
    super(repo);
  }
}
