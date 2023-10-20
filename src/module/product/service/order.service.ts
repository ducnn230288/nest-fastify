import { Order, OrderAddress, OrderProduct, Product } from '@model';
import { BaseService } from '@shared';
import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { OrderAddressService } from './order-address.service';
import { OrderProductService } from './order-product.service';
import { CreateOrderRequestDto } from '../dto/order.dto';
import { ProductService } from '@service';
import { I18nContext } from 'nestjs-i18n';
import { OrderRepository } from '@repository';

export const P_ORDER_LISTED = '54e3dc6a-5e96-11ee-8c99-0242ac120002';
export const P_ORDER_CREATE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f13';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    public repo: OrderRepository,
    private orderAddressService: OrderAddressService,
    private orderProductService: OrderProductService,
    private productService: ProductService,
    private dataSource: DataSource,
  ) {
    super(repo);
  }

  async createOrder(body: CreateOrderRequestDto, userId: string): Promise<number | any> {
    return this.repo.createOrder(body, userId);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  groupByProperty(arr, property) {
    const grouped = {};
    for (const item of arr) {
      const key = item[property]; // = "productStoreId"
      if (!grouped[key]) {
        // grouped["productStoreId"]
        grouped[key] = [];
      }
      grouped[key].push(item);
    }
    return grouped;
  }

  // groupBy(list: any[], key: string): Map<string, Array<any>> {
  //   let map = new Map();
  //   list.map(val => {
  //     if (!map.has(val[key])) {
  //       map.set(val[key], list.filter(data => data[key] == val[key]));
  //     }
  //   });
  //   return map;
  // }
}
