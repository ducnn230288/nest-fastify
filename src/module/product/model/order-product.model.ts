import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Max, Min } from 'class-validator';

import { Order, Product } from '@model';
import { Base } from '@shared';

@Entity({ schema: 'product' })
export class OrderProduct extends Base {
  @Column() // { name: 'product_id' }
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  productId: string;

  @ManyToOne(() => Product, (product) => product.id)
  @Type(() => Product)
  readonly product?: Product;

  @Column() // { name: 'order_id' }
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  orderId: string;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn()
  @Type(() => Order)
  readonly order?: Order;

  @Column()
  @IsNumber()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @Type(() => String)
  name: string;

  @Column()
  @Min(0)
  @IsNumber()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @Type(() => Number)
  price: number;

  @Column()
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: faker.number.int(), description: '' })
  @Type(() => Number)
  quantity: number;

  @Column({ default: 0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ example: faker.number.int({ min: 0, max: 100 }), description: '' })
  discount: number;

  @Column()
  @IsNumber()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @Type(() => Number)
  total: number;
}
