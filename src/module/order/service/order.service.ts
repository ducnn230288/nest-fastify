import { Order, OrderAddress, OrderProduct, Product } from '@model';
import { BaseService } from '@shared';
import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
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
    private dataSource: DataSource,
  ) {
    super(repo);
  }

  async createOrder(body: any): Promise<number | any> {
    // console.log(body);

    const orders: Order[] = [];
    // let orderProducts: Array<OrderProduct | null> = [];
    // let orderAddresses: Array<OrderAddress | null> = [];

    const { products, codeProvince, codeDistrict, codeWard, userId, specificAddress, reason, addressId } = body;

    // const { products, codeWard, codeDistrict, codeProvince, specificAddress, addressId, ...item } = body;
    const listProds: Array<Product | undefined> = [];
    await this.dataSource.transaction(
      async (entityManager) =>
        await Promise.all(
          products.map(async (product) => {
            const data = await entityManager.preload(Product, {
              id: product.id,
            });
            if (!data) {
              throw new BadRequestException(`${product.name} not exists`);
            }
            if (product.quantity > Number(data?.quantity)) {
              throw new BadRequestException(`Quantity of ${product.name} is not enough`);
            }
            if (product.name !== data?.name) {
              throw new BadRequestException(`The name has been changed to ${data?.name}`);
            }
            if (product.price !== data?.price) {
              throw new BadRequestException(`The price of ${product.name} has been changed`);
            }
            if (product.productStoreId !== data?.productStoreId) {
              throw new BadRequestException(`The Store of ${product.name} was wrong`);
            }
            // console.log(data);
            data!.quantity = Number(product.quantity);
            listProds.push(data);
          }),
        ),
    );
    // console.log(listProds);
    const data = this.groupByProperty(listProds, 'productStoreId');
    // console.log(data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of Object.entries(data)) {
      const total = data[key].reduce((init, curProd) => {
        return (
          init +
          (curProd.price * curProd.quantity - Math.round((curProd.price * curProd.quantity * curProd.discount) / 100))
        );
      }, 0);
      const dataOrder = await this.repo.create({ userId, total: total, reason: reason });
      const order = await this.repo.save(dataOrder);
      orders.push(order);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const orderAddress = await this.orderAddressService.create({
        codeProvince,
        codeDistrict,
        codeWard,
        specificAddress,
        addressId,
        orderId: order.id,
      });

      // orderAddresses.push(orderAddress);

      data[key].forEach(async (prob) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const orderProduct = await this.orderProductService.create({
          name: prob.name,
          orderId: order.id,
          price: prob.price,
          quantity: prob.quantity,
          total: prob.price * prob.quantity - Math.round((prob.price * prob.quantity * prob.discount) / 100),
          discount: prob.discount,
          productId: prob.id,
        });
      });
    }

    return {
      // orders,
    };
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
