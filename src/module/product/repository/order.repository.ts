/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { DataSource } from 'typeorm';
import { Order } from '@model';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  /*
  async createOrder(body: CreateOrderRequestDto, userId: string): Promise<object | any> {
    const i18n = I18nContext.current()!;
    const { products, codeProvince, codeDistrict, codeWard, specificAddress, reason, addressId } = body;
    let listProdsInDB: Array<Product | undefined> = [];

    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        await products.map(async (product) => {
          const dataProd = await queryRunner.manager.preload(Product, {
            id: product.id,
          });

          if (!dataProd) {
            throw new BadRequestException(i18n.t(`common.Data ${dataProd!.id} is not found`));
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for (const [key, value] of Object.entries(product)) {
            if (key === 'quantity' && product[key] > Number(dataProd[key])) {
              throw new BadRequestException(i18n.t(`common.Data ${key} is not enough`));
            } else if (key !== 'quantity' && product[key] !== dataProd[key]) {
              throw new BadRequestException(i18n.t(`common.Data ${key} was changed`));
            }
          }

          dataProd.quantity -= product.quantity;
          listProdsInDB.push(dataProd);
        }),
      );

      for (const storeId in dataGroupBy) {
        // eslint-disable-next-line no-prototype-builtins
        if (dataGroupBy.hasOwnProperty(storeId)) {
          const products: Array<OrderProduct | any> = dataGroupBy[storeId];

          const total = dataGroupBy[storeId].reduce((init, curProd) => {
            return (
              init +
              (curProd.price * curProd.quantity -
                Math.round((curProd.price * curProd.quantity * curProd.discount) / 100))
            );
          }, 0);

          const order = await queryRunner.manager.save(
            queryRunner.manager.create(Order, { userId, total: total, reason: reason, productStoreId: storeId }),
          );

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const orderAddress = await queryRunner.manager.save(
            queryRunner.manager.create(OrderAddress, {
              codeProvince,
              codeDistrict,
              codeWard,
              specificAddress,
              addressId: addressId,
              orderId: order.id,
            }),
          );

          const productsData = products.map((prod: OrderProduct) => {
            return queryRunner.manager.create(OrderProduct, {
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
          const orderProducts = await queryRunner.manager.save(productsData);
        }
      }

      await queryRunner.manager.save(listProdsInDB);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    await this.dataSource.transaction(async (entityManager) => {
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

      const dataGroupBy = this.groupByProperty(products, 'productStoreId');
      for (const storeId in dataGroupBy) {
        // eslint-disable-next-line no-prototype-builtins
        if (dataGroupBy.hasOwnProperty(storeId)) {
          const products: Array<OrderProduct | any> = dataGroupBy[storeId];

          const total = dataGroupBy[storeId].reduce((init, curProd) => {
            return (
              init +
              (curProd.price * curProd.quantity -
                Math.round((curProd.price * curProd.quantity * curProd.discount) / 100))
            );
          }, 0);

          const order = await entityManager.save(
            entityManager.create(Order, { userId, total: total, reason: reason, productStoreId: storeId }),
          );

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const orderAddress = await entityManager.save(
            entityManager.create(OrderAddress, {
              codeProvince,
              codeDistrict,
              codeWard,
              specificAddress,
              addressId: addressId,
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
  */
}
