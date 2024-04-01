import { faker } from '@faker-js/faker';
import { Address, AddressDistrict, Order, AddressProvince, AddressWard } from '@model';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ schema: 'product' })
export class OrderAddress extends Base {
  @Column() // { name: 'code_ward' }
  @Type(() => String)
  codeWard: string;

  @ManyToOne(() => AddressWard, (ward) => ward.orderAddress, { eager: false })
  @JoinColumn({ name: 'codeWard', referencedColumnName: 'code' })
  public ward?: AddressWard;

  @Column() //{ name: 'code_district' }
  @IsString()
  codeDistrict: string;

  @ManyToOne(() => AddressDistrict, (district) => district.orderAddress, { eager: false })
  @JoinColumn({ name: 'codeDistrict', referencedColumnName: 'code' })
  public district?: AddressDistrict;

  @Column() // { name: 'code_province' }
  @IsString()
  codeProvince: string;

  @ManyToOne(() => AddressProvince, (province) => province.orderAddress, { eager: false })
  @JoinColumn({ name: 'codeProvince', referencedColumnName: 'code' })
  public province?: AddressProvince;

  @Column()  // { name: 'specific_address' }
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  specificAddress?: string;

  @Column() // { name: 'order_id' }
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  orderId: string;

  @OneToOne(() => Order, (order) => order.orderAddress)
  @Type(() => Order)
  @JoinColumn()
  readonly order?: Order;

  @Column() // { name: 'address_id' }
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  addressId: string;

  @ManyToOne(() => Address, (address) => address.orderAddress)
  @Type(() => Address)
  @JoinColumn()
  readonly address?: Address;
}