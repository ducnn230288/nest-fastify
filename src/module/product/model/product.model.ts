import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsString, IsNumber, IsUUID, IsOptional, IsPositive, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Exclude, Expose } from 'class-transformer';

import { Base, MaxGroup } from '@shared';
import { ProductCategory, OrderProduct, ProductStore } from '@model';

@Entity({ schema: 'product' })
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

  @Column({
    type: 'text',
    array: false,
    transformer: {
      to: (value: string[]) => value.join(','),
      from: (value: string) => value?.split(','),
    },
    default: '',
  })
  @ApiProperty({ example: [faker.image.url(), faker.image.url()] })
  @IsArray()
  @Expose()
  images?: string[];

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
  discount: number;

  @Column() // { name: 'product_category_id' }
  @ApiProperty({ example: faker.string.uuid() })
  @IsUUID()
  productCategoryId: string;

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products, {
    eager: false,
  })
  @Expose({ groups: [MaxGroup] })
  @JoinColumn()
  public productCategory?: ProductCategory;

  @Column() // { name: 'product_store_id' }
  @ApiProperty({ example: faker.string.uuid() })
  @IsUUID()
  productStoreId: string;

  @ManyToOne(() => ProductStore, (productStore) => productStore.products, {
    eager: false,
  })
  @Expose({ groups: [MaxGroup] })
  @JoinColumn()
  public productStore?: ProductStore;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  @IsOptional()
  readonly orderProducts?: OrderProduct[];
}
