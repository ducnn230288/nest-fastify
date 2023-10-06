import { Order } from '@model';
import { BaseService } from '@shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { OrderAddressService } from './order-address.service';
import { OrderProductService } from './order-product.service';
import { CreateOrderRequestDto } from '../dto/order.dto';
import { ProductService } from '@service';

export const P_ORDER_LISTED = '54e3dc6a-5e96-11ee-8c99-0242ac120002';
export const P_ORDER_CREATE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f13';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order) public repo: Repository<Order>,
    private orderAddressService: OrderAddressService,
    private orderProductService: OrderProductService,
    private productService: ProductService,
  ) {
    super(repo);
  }

  async createOrder(body: CreateOrderRequestDto): Promise<number | any> {
    const { products, codeWard, codeDistrict, codeProvince, specificAddress, addressId, ...item } = body;

    const d = await Promise.all(
      products.map(async (item) => {
        const p = await this.productService.findOne(String(item.id));
        return Number(p?.price) * item.quantity;
      }),
    );
    const total = d.reduce((a, b) => a + b, 0);

    const order = await this.create({
      ...item,
      total,
    });

    const orderAddress = await this.orderAddressService.create({
      codeWard,
      codeDistrict,
      codeProvince,
      specificAddress,
      addressId,
      orderId: order?.id,
    });

    const orderProduct = await Promise.all(
      products.map(async (item) => {
        const p = await this.productService.findOne(String(item.id));

        console.log(p);
        console.log({
          orderId: order?.id,
          productId: item.id,
          quantity: item.quantity,
          name: p?.name,
          price: p?.price,
          total: Number(p?.price) * item.quantity,
        });

        const pn = await this.orderProductService.create({
          orderId: order?.id,
          productId: item.id,
          quantity: item.quantity,
          name: p?.name,
          price: p?.price,
          total: Number(p?.price) * item.quantity,
        });

        console.log(pn);
        return {
          ...pn,
        };
      }),
    );

    return {
      ...order,
      address: orderAddress,
      products: orderProduct,
    };
  }
}
