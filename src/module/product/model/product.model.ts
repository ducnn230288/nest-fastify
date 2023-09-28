import { Entity, ManyToOne } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';

import { Base } from '@shared';
import { Category } from '@model';
import { Type } from 'class-transformer';

@Entity()
export class Product extends Base {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  images: string;

  @IsNumber()
  status: number;

  @IsString()
  slug: string;

  @IsString()
  mass: string;

  @IsNumber()
  disCount: number;

  store: string;

  @ManyToOne(() => Category, (category) => category.products)
  @Type(() => Category)
  category: Category;
}
