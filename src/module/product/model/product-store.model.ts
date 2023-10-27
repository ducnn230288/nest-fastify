import { faker } from '@faker-js/faker';
import { IsString, IsNumber, IsOptional, IsUUID, IsArray } from 'class-validator';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Order, Product, User } from '@model';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductStore extends Base {
  @Column()
  @IsString()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  name: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 0, description: '' })
  @IsNumber()
  @Expose()
  status: number;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.phone.number(), description: '' })
  phone: string;

  @Column()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  description: string;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.lorem.slug(), description: '' })
  slug: string;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.image.url(), description: '' })
  avatar: string;

  @Column({ name: 'user_id' })
  @Expose()
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  userId?: string;

  @ManyToOne(() => User, (user) => user.store, { eager: false })
  @JoinColumn()
  user?: User;

  @OneToMany(() => Order, (order) => order.productStore)
  @IsArray()
  orders?: Order[];

  @OneToMany(() => Product, (product) => product.productStore)
  @IsArray()
  public products?: Product[];
}
