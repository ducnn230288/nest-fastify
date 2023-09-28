import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Expose } from 'class-transformer';
import { Product, User } from '@model';

@Entity()
export class Store extends Base {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  status: string;

  @Column()
  @IsNumber()
  phone: number;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  slug: string;

  @Column()
  @IsString()
  avatar: string;

  @Column()
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @OneToOne(() => User, (user) => user.store)
  @JoinColumn()
  user?: User;

  @OneToMany(() => Product, (product) => product.store)
  products?: Product[];
}
