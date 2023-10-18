import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { I18nContext } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

import { Order, OrderAddress, OrderProduct, Product } from '@model';
import { CreateOrderRequestDto } from '@dto';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async createOrder(body: CreateOrderRequestDto, userId: string): Promise<Order | any> {
    const i18n = I18nContext.current()!;
    const { products, codeProvince, codeDistrict, codeWard, specificAddress, reason, addressId } = body;
    // eslint-disable-next-line prefer-const
    let listProdsInDB: Array<Product | undefined> = [];

    await this.dataSource.transaction(async (entityManager) => {
      await Promise.all(
        await products.map(async (product) => {
          const dataProd = await entityManager.preload(Product, {
            id: product.id,
          });
          if (!dataProd) {
            throw new BadRequestException(i18n.t(`common.Data ${dataProd!.id} is not found`));
          }

          for (const [key, value] of Object.entries(product)) {
            if (key === 'quantity' && product[key] > Number(dataProd[key])) {
              throw new BadRequestException(i18n.t(`common.Data ${key} is not enough`));
            } else if (key !== 'quantity' && product[key] !== dataProd[key]) {
              throw new BadRequestException(i18n.t(`common.Data ${key} was changed`));
            }
          }
          //   console.log(dataProd);
          dataProd.quantity -= product.quantity;
          listProdsInDB.push(dataProd);
        }),
      );
      //   console.log(listProdsInDB);
      const dataGroupBy = this.groupByProperty(products, 'productStoreId');
      console.log(dataGroupBy);

      for (const [key, value] of Object.entries(dataGroupBy)) {
        const total = dataGroupBy[key].reduce((init, curProd) => {
          return (
            init +
            (curProd.price * curProd.quantity - Math.round((curProd.price * curProd.quantity * curProd.discount) / 100))
          );
        }, 0);

        const dataOrder = await entityManager.save(
          entityManager.create(Order, { userId, total: total, reason: reason }),
        );

        const orderAddress = await entityManager.save(
          entityManager.create(OrderAddress, {
            codeProvince,
            codeDistrict,
            codeWard,
            specificAddress,
            addressId,
            orderId: dataOrder.id,
          }),
        );

        dataGroupBy[key].forEach(async (prod) => {
          const orderProduct = await entityManager.save(
            entityManager.create(OrderProduct, {
              name: prod.name,
              orderId: dataOrder.id,
              price: prod.price,
              quantity: prod.quantity,
              total: prod.price * prod.quantity - Math.round((prod.price * prod.quantity * prod.discount) / 100),
              discount: prod.discount,
              productId: prod.id,
            }),
          );
        });

        listProdsInDB.forEach(async (prod) => {
          await entityManager.save(prod);
        });
      }
    });

    return {};
  }

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
}
