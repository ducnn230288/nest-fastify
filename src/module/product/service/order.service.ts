import { Address, Order, OrderAddress, OrderProduct, Product, User } from '@model';
import { BaseService } from '@shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from '../dto/order.dto';
import { OrderRepository, ProductRepository } from '@repository';
import { I18nContext } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

export const P_ORDER_LISTED = '54e3dc6a-5e96-11ee-8c99-0242ac120002';
export const P_ORDER_CREATE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f13';
export const P_ORDER_DELETE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f14';
export const P_ORDER_UPDATE = 'f4dc7e8b-84e4-469b-8342-946fd8f24f16';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    public repo: OrderRepository,
    private dataSource: DataSource,
    private productRepo: ProductRepository,
  ) {
    super(repo);
    this.listJoin = ['orderAddress', 'orderProducts'];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createOrder(body: CreateOrderRequestDto, user: User): Promise<object | any> {
    const i18n = I18nContext.current()!;
    const { products, codeProvince, codeDistrict, codeWard, specificAddress, reason, addressId = '' } = body;
    // eslint-disable-next-line prefer-const
    let listProdsInDB: Array<Product | undefined> = [];
    let address: Address | null;

    await this.dataSource.transaction(async (entityManager) => {
      if (!addressId) {
        address = await entityManager.save(
          entityManager.create(Address, {
            codeProvince,
            codeDistrict,
            codeWard,
            specificAddress,
            userId: user.id,
          }),
        );
      } else {
        address = user.address?.find((item) => item.id === addressId) || null;
        if (!address) {
          throw new BadRequestException(i18n.t(`addressId was not found`));
        }
      }

      await Promise.all(
        await products.map(async (product) => {
          const dataProd = await entityManager.findOneBy(Product, {
            id: product.id,
          });

          if (!dataProd) {
            throw new BadRequestException(i18n.t(`common.Data ${dataProd!.id} is not found`));
          }

          Object.keys(product).forEach((key) => {
            if (key === 'quantity' && product[key] > Number(dataProd[key])) {
              throw new BadRequestException(i18n.t(`common.Data ${key} is not enough`));
            } else if (key !== 'quantity' && product[key] !== dataProd[key]) {
              throw new BadRequestException(i18n.t(`common.Data ${key} was changed`));
            }
          });

          dataProd.quantity -= product.quantity;
          listProdsInDB.push(dataProd);
        }),
      );

      const dataGroupBy = this.productRepo.groupByProperty(products, 'productStoreId');
      for (const storeId in dataGroupBy) {
        // eslint-disable-next-line no-prototype-builtins
        if (dataGroupBy.hasOwnProperty(storeId)) {
          const products: Array<OrderProduct | null> = dataGroupBy[storeId];

          const total = dataGroupBy[storeId].reduce((init, curProd) => {
            return (
              init +
              (curProd.price * curProd.quantity -
                Math.round((curProd.price * curProd.quantity * curProd.discount) / 100))
            );
          }, 0);

          const order = await entityManager.save(
            entityManager.create(Order, { userId: user.id, total: total, reason: reason, productStoreId: storeId }),
          );

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const orderAddress = await entityManager.save(
            entityManager.create(OrderAddress, {
              codeProvince,
              codeDistrict,
              codeWard,
              specificAddress,
              addressId: address?.id,
              orderId: order.id,
            }),
          );

          const productsData = products.map((prod: OrderProduct) => {
            return entityManager.create(OrderProduct, {
              name: prod.name,
              orderId: order.id,
              price: prod.price,
              quantity: prod.quantity,
              total: prod.price * prod.quantity - Math.round((prod.price * prod.quantity * prod.discount) / 100),
              discount: prod.discount,
              productId: prod.id,
            });
          });

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const orderProducts = await entityManager.save(productsData);
        }
      }

      await entityManager.save(listProdsInDB);
    });
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateStatus(id: string, status: number): Promise<Order | any> {
    const i18n = I18nContext.current()!;
    const order = await this.findOne(id);

    const { result, message } = this.checkOrderStatus(order!.status!, status);
    if (!result) throw new BadRequestException(i18n.t(message));

    const data = await this.update(order!.id!, { status: status });
    return { data, message };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getStatusOrder(data: number) {
    let status, detailStatus;

    switch (data) {
      case 0:
        status = 0;
        detailStatus = 'Pending';
        break;
      case 1:
        status = 1;
        detailStatus = 'Accepted';
        break;
      case 2:
        status = 2;
        detailStatus = 'Shipping';
        break;
      case 3:
        status = 3;
        detailStatus = 'Finish';
        break;
      case -1:
        status = -1;
        detailStatus = 'Cancel';
        break;
      case -2:
        status = -2;
        detailStatus = 'Reject';
        break;
      default:
        status = -999;
        detailStatus = 'Page not found';
        break;
    }

    return { status, detailStatus };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  checkOrderStatus(orderStatus: number, paramStatus: number) {
    const { detailStatus } = paramStatus >= 0 ? this.getStatusOrder(orderStatus + 1) : this.getStatusOrder(paramStatus);

    if (orderStatus >= 0 && paramStatus === orderStatus + 1) {
      return {
        result: true,
        message: detailStatus,
      };
    }

    if (orderStatus === 0 && paramStatus < 0) {
      return {
        result: true,
        message: detailStatus,
      };
    }

    if (paramStatus < -2) return { result: false, message: 'Page not found' };
    if (orderStatus >= 0 && paramStatus > orderStatus + 1)
      return { result: false, message: `Your Order not ${detailStatus}` };
    if (orderStatus >= 1 && paramStatus < 0) return { result: false, message: 'Your Order was accepted' };

    return { result: false, message: `Not found ${paramStatus}` };
  }
}
