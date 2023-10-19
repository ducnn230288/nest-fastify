import { Order } from '@model';
import { BaseService } from '@shared';
import { Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from '../dto/order.dto';
import { OrderRepository } from '@repository';

export const P_ORDER_LISTED = '54e3dc6a-5e96-11ee-8c99-0242ac120002';
export const P_ORDER_CREATE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f13';
export const P_ORDER_DELETE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f14';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(public repo: OrderRepository) {
    super(repo);
    this.listJoin = ['orderAddress', 'orderProducts'];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createOrder(body: CreateOrderRequestDto, userId: string): Promise<object | any> {
    return this.repo.createOrder(body, userId);
  }
}
