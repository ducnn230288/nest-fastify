import { Injectable } from '@nestjs/common';
import { BaseService } from '@shared';
import { OrderProduct } from '@model';
import { OrderProductRepository } from '@repository';

@Injectable()
export class OrderProductService extends BaseService<OrderProduct> {
  constructor(public repo: OrderProductRepository) {
    super(repo);
  }
}
