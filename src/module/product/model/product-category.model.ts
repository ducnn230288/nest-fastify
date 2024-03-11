import { Column, Entity, OneToMany, TreeChildren, TreeParent } from 'typeorm';
import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Expose } from 'class-transformer';

import { Base } from '@shared';
import { Product } from '@model';

@Entity({ schema: 'product' })
export class ProductCategory extends Base {
  @Column()
  @ApiProperty({ example: faker.person.fullName(), description: '' })
  @IsString()
  @Expose()
  name: string;

  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  // @Expose()
  description: string;

  @Column()
  @ApiProperty({ example: faker.lorem.slug(), description: '' })
  @IsString()
  @Expose()
  slug: string;

  @Column()
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  image: string;

  @OneToMany(() => Product, (product) => product.productCategory)
  @IsArray()
  public products?: Product[];

  @TreeChildren()
  children?: ProductCategory[];

  @TreeParent()
  parent?: ProductCategory;
}
