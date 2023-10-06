import { faker } from '@faker-js/faker';
import { Address, District, Order, Province, Ward } from '@model';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class OrderAddress extends Base {
  @Column()
  @Type(() => String)
  codeWard: string;

  @ManyToOne(() => Ward, (ward) => ward.orderAddress, { eager: true })
  // @JoinColumn({ name: 'codeWard', referencedColumnName: 'code' })
  @JoinColumn()
  public ward?: Ward;

  @Column()
  @IsString()
  codeDistrict: string;

  @ManyToOne(() => District, (district) => district.orderAddress, { eager: true })
  // @JoinColumn({ name: 'codeDistrict', referencedColumnName: 'code' })
  @JoinColumn()
  public district?: District;

  @Column()
  @IsString()
  codeProvince: string;

  @ManyToOne(() => Province, (province) => province.orderAddress, { eager: false })
  // @JoinColumn({ name: 'codeProvince', referencedColumnName: 'code' })
  @JoinColumn()
  public province?: Province;

  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  specificAddress?: string;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  orderId: string;

  @OneToOne(() => Order, (order) => order.orderAddress)
  @Type(() => Order)
  @JoinColumn()
  readonly order?: Order;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  addressId: string;

  @ManyToOne(() => Address, (address) => address.orderAddress)
  @Type(() => Address)
  @JoinColumn()
  readonly address?: Address;
}
