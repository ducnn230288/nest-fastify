import { Column, Entity, ManyToOne } from 'typeorm';
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
  @ApiProperty({ example: faker.number.float() })
  @IsString()
  @IsPositive()
  @Expose()
  mass: string;

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
  categoryId?: string;

  @Column()
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  storeId?: string;

  @ManyToOne(() => Store, (store) => store.products)
  @Expose({ groups: [MaxGroup] })
  public store: Store;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: false,
  })
  @Expose({ groups: [MaxGroup] })
  public category: Category;
}
