import { Column, Entity, OneToMany } from 'typeorm';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Expose } from 'class-transformer';

import { Base } from '@shared';
import { Product } from '@model';

@Entity()
export class Category extends Base {
  @Column()
  @ApiProperty({ example: faker.person.fullName(), description: '' })
  @IsString()
  @Expose()
  name: string;

  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @Expose()
  description: string;

  @Column()
  @ApiProperty({ example: faker.lorem.slug(), description: '' })
  @IsString()
  @Expose()
  slug: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  parentId?: string;

  @OneToMany(() => Product, (product) => product.category, { eager: true })
  @IsArray()
  @IsOptional()
  public products?: Product[];
}
