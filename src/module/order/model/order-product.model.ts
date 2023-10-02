import { Base } from '@shared';
import { Type } from 'class-transformer';
import { Column, OneToMany, Entity, ManyToOne } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber } from 'class-validator';
import { Order } from './order.model';
import { Product } from '../../product/model/product.model';

@Entity()
export class OrderProduct extends Base {
  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  productId: string;

  @ManyToOne(() => Product, (product) => product.id)
  @Type(() => Product)
  readonly product?: Product;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  orderId: string;

  @ManyToOne(() => Order, (order) => order.id)
  @Type(() => Order)
  readonly order?: Order;

  @Column()
  @IsNumber()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @Type(() => Number)
  price: number;

  @Column()
  @IsNumber()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @Type(() => Number)
  quantity: number;

  @Column()
  @IsNumber()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @Type(() => Number)
  total: number;
}
