import { Injectable } from '@nestjs/common';
import { BaseService } from '@shared';
import { OrderAddress } from '@model';
import { OrderAddressRepository } from '@repository';

@Injectable()
export class OrderAddressService extends BaseService<OrderAddress> {
  constructor(public repo: OrderAddressRepository) {
    super(repo);
  }
}
