import { faker } from '@faker-js/faker';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Product, User } from '@model';
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

  @Column()
  @Expose()
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  userId?: string;

  @ManyToOne(() => User, (user) => user.store, { eager: true })
  @JoinColumn()
  user?: User;

  @OneToMany(() => Product, (product) => product.productStore)
  products?: Product[];
}
