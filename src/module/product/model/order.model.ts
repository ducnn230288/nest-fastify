import { OrderAddress, OrderProduct, ProductStore, User } from '@model';
import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Expose, Type } from 'class-transformer';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import { IsOptional, IsUUID, IsString, IsNumber } from 'class-validator';
import { customAlphabet } from 'nanoid';

@Entity()
export class Order extends Base {
  @Column({ name: 'user_id' })
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  userId?: string;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn()
  @Type(() => User)
  readonly user?: User;

  @Column({
    default: '0',
  })
  @ApiProperty({ example: 'pending', description: '' })
  @IsString()
  status?: number;

  @Column({ name: 'order_code' })
  @ApiProperty({ example: faker.number.int(10), description: '' })
  orderCode: string;
  @BeforeInsert()
  beforeInsertOrderCode(): void {
    this.orderCode = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)();
  }

  @Column()
  @ApiProperty({ example: faker.number.int(5), description: '' })
  @IsNumber()
  total: number;

  @Column({ default: '' })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  reason?: string;

  @Column()
  @ApiProperty({ example: faker.string.uuid() })
  @IsUUID()
  productStoreId: string;

  @ManyToOne(() => ProductStore, (productStore) => productStore.orders, {
    eager: false,
  })
  @Expose({ groups: [MaxGroup] })
  @JoinColumn()
  productStore: ProductStore;

  @OneToOne(() => OrderAddress, (orderAddress) => orderAddress.order)
  orderAddress?: OrderAddress;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}