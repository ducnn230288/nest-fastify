import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsString, IsNumber, IsUUID, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Exclude, Expose } from 'class-transformer';

import { Base, MaxGroup } from '@shared';
import { CategoryProduct, OrderProduct, StoreProduct } from '@model';

@Entity()
export class Product extends Base {
  @Column()
  @IsString()
  @ApiProperty({ example: faker.person.fullName(), description: '' })
  @Expose()
  name: string;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @Expose()
  description: string;

  @Column()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: faker.number.int({ max: 100 }) })
  @Expose()
  quantity: number;

  @Column()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: faker.number.int({ min: 0, max: 100000000 }) })
  @Expose()
  price: number;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.image.url() })
  @Expose()
  images: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  @Exclude()
  @IsOptional()
  status?: number;

  @Column()
  @ApiProperty({ example: faker.lorem.slug(), description: '' })
  @IsString()
  @Expose()
  slug: string;

  @Column()
  @ApiProperty({ example: faker.number.int({ min: 0, max: 100 }) })
  @IsNumber()
  @IsPositive()
  @Expose()
  mass: number;

  @Column({ default: 0 })
  @IsNumber()
  @ApiProperty({ example: faker.number.int(100) })
  @IsPositive()
  @IsOptional()
  @Expose()
  disCount: number;

  @Column()
  @ApiProperty({ example: faker.string.uuid() })
  @IsUUID()
  categoryProductId: string;

  @ManyToOne(() => CategoryProduct, (categoryProduct) => categoryProduct.products, {
    eager: false,
  })
  @Expose({ groups: [MaxGroup] })
  public categoryProduct?: CategoryProduct;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.string.uuid() })
  @IsUUID()
  storeId?: string;

  @ManyToOne(() => StoreProduct, (store) => store.products)
  @Expose({ groups: [MaxGroup] })
  @IsOptional()
  public store?: StoreProduct;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  @IsOptional()
  readonly orderProducts?: OrderProduct[];
}
