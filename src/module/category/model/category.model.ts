import { Entity, OneToMany } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';

import { Base } from '@shared';
import { Product } from '@model';

@Entity()
export class Category extends Base {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  slug: string;

  @IsNumber()
  parentId: number;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
