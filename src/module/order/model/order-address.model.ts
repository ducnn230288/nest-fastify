import { faker } from '@faker-js/faker';
import { Address, District, Order, Province, Ward } from '@model';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class OrderAddress extends Base {
  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  codeWard: string;

  @OneToOne(() => Ward, (ward) => ward.code)
  @JoinColumn()
  @Type(() => Ward)
  readonly ward?: Ward;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @IsString()
  codeDistrict: string;

  @OneToOne(() => District, (district) => district.code)
  @JoinColumn(
   )
  @Type(() => District)
  readonly district?: District;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @IsString()
  codeProvince: string;

  @OneToOne(() => Province, (province) => province.code)
  @JoinColumn(
   
  )
  @Type(() => Province)
  readonly province?: Province;

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

  @OneToOne(() => Order, (order) => order.orderId)
  @Type(() => Order)
  @JoinColumn()
  readonly order?: Order;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  @Type(() => String)
  addressId: string;

  @OneToOne(() => Address, (address) => address.id)
  @Type(() => Address)
  @JoinColumn()
  readonly address?: Address;

}


