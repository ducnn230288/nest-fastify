import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

import { Address, EStatusOrder, Order, OrderAddress, OrderProduct, Product, User } from '@model';
import { OrderRepository, ProductRepository } from '@repository';
import { CreateOrderRequestDto, ListOrderResponseDto, OrderDto, OrderUpdateStatusDto } from '@dto';
import { BaseService } from '@shared';

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

  async createOrder(body: CreateOrderRequestDto, user: User): Promise<null> {
    const i18n = I18nContext.current()!;
    const { products, codeProvince, codeDistrict, codeWard, specificAddress, reason, addressId = '' } = body;
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

      const dataProds: Array<Product | undefined> = await this.productRepo.findProductsWitdId(
        products.map((product) => product.id as string),
      );

      listProdsInDB = dataProds.map((item, index) => {
        item!.quantity -= products[index].quantity;
        return item;
      });

      const dataGroupBy = this.productRepo.groupByProperty(products, 'productStoreId');
      for (const storeId in dataGroupBy) {
        if (Object.prototype.hasOwnProperty.call(dataGroupBy, storeId)) {
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

          await entityManager.save(
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

          await entityManager.save(productsData);
        }
      }

      await entityManager.save(listProdsInDB);
    });

    return null;
  }

  async updateStatus(id: string, status: number): Promise<OrderUpdateStatusDto> {
    const i18n = I18nContext.current()!;
    const order = await this.findOne(id);

    const { result, message } = this.checkOrderStatus(order!.status!, status);
    if (!result) throw new BadRequestException(i18n.t('common.StatusOrder.Not Found'));

    const data = (await this.update(order!.id!, { status: status })) as OrderDto;
    return {
      message,
      data,
    };
  }

  checkOrderStatus(orderStatus: number, paramStatus: number): { result: boolean; message: string } {
    const i18n = I18nContext.current()!;
    if (orderStatus >= EStatusOrder.Pending && paramStatus === orderStatus + 1) {
      return {
        result: true,
        message: EStatusOrder[paramStatus],
      };
    }

    if (orderStatus === EStatusOrder.Pending && paramStatus < EStatusOrder.Pending) {
      return {
        result: true,
        message: EStatusOrder[paramStatus],
      };
    }

    if (orderStatus >= EStatusOrder.Pending && paramStatus > orderStatus + 1)
      throw new BadRequestException(i18n.t(`common.StatusOrder.Not ${EStatusOrder[orderStatus + 1]}`));
    if (paramStatus < EStatusOrder.Reject || paramStatus > EStatusOrder.Finish)
      throw new NotFoundException(i18n.t('common.Wiews.404.The page you were looking'));
    if (orderStatus >= EStatusOrder.Accepted && paramStatus < EStatusOrder.Pending)
      throw new BadRequestException(i18n.t('common.StatusOrder.Was Accepted'));
    return { result: false, message: `Not found ${paramStatus}` };
  }
}
