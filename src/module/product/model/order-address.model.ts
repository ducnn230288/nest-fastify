import { faker } from '@faker-js/faker';
import { Address, District, Order, Province, Ward } from '@model';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class OrderAddress extends Base {
  @Column({ name: 'code_ward' })
  @Type(() => String)
  codeWard: string;

  @ManyToOne(() => Ward, (ward) => ward.orderAddress, { eager: false })
  @JoinColumn({ name: 'codeWard', referencedColumnName: 'code' })
  public ward?: Ward;

  @Column({ name: 'code_district' })
  @IsString()
  codeDistrict: string;

  @ManyToOne(() => District, (district) => district.orderAddress, { eager: false })
  @JoinColumn({ name: 'codeDistrict', referencedColumnName: 'code' })
  public district?: District;

  @Column({ name: 'code_province' })
  @IsString()
  codeProvince: string;

  @ManyToOne(() => Province, (province) => province.orderAddress, { eager: false })
  @JoinColumn({ name: 'codeProvince', referencedColumnName: 'code' })
  public province?: Province;

  @Column({ name: 'specific_address' })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  specificAddress?: string;

  @Column({ name: 'order_id' })
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  orderId: string;

  @OneToOne(() => Order, (order) => order.orderAddress)
  @Type(() => Order)
  @JoinColumn()
  readonly order?: Order;

  @Column({ name: 'address_id' })
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  addressId: string;

  @ManyToOne(() => Address, (address) => address.orderAddress)
  @Type(() => Address)
  @JoinColumn()
  readonly address?: Address;
}
