import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsString, IsNumber, IsUUID, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Exclude, Expose } from 'class-transformer';

import { Base, MaxGroup } from '@shared';
import { Category, Store } from '@model';

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
  @ApiProperty({ example: faker.number.int() })
  @Expose()
  price: number;

  @Column()
  @IsString()
  @Expose()
  images: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  @Exclude()
  status: number;

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

  @Column()
  @IsNumber()
  @ApiProperty({ example: faker.number.int(100) })
  @IsPositive()
  @IsOptional()
  @Expose()
  disCount: number;

  @Column()
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: false,
  })
  @Expose({ groups: [MaxGroup] })
  public category?: Category;

  @Column({ nullable: true })
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  storeId?: string;

  @ManyToOne(() => Store, (store) => store.products)
  @Expose({ groups: [MaxGroup] })
  @IsOptional()
  public store?: Store;
}
