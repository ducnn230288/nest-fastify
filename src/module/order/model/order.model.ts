import { User } from '@model';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import { IsOptional, IsUUID } from 'class-validator';

@Entity()
export class Order extends Base {
  @Column()
  @IsUUID()
  @ApiProperty({ example: faker.datatype.uuid(), description: '' })
  userId?: string;

  @ManyToOne(() => User, (user) => user.id)
  @Type(() => User)
  readonly user?: User;

  @Column({
    default: 'pending',
  })
  @ApiProperty({ example: 'pending', description: '' })
  @Type(() => String)
  status?: string;

  @Column()
  @ApiProperty({ example: faker.number.int(10), description: '' })
  @Type(() => String)
  orderCode: string;

  @Column()
  @ApiProperty({ example: faker.number.int(5), description: '' })
  @Type(() => Number)
  total: number;

  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @Type(() => String)
  @IsOptional()
  reason?: string;
}
