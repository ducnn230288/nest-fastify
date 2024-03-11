import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Address, AddressDistrict, OrderAddress } from '@model';

@Entity({ schema: 'user' })
@Unique(['code'])
export class AddressProvince extends Base {
  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @Expose()
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @Expose()
  @IsString()
  code: string;

  @OneToMany(() => Address, (address) => address.provinceItem, { eager: true })
  @Expose({ groups: [MaxGroup] })
  items?: Address[];

  @OneToMany(() => AddressDistrict, (district) => district.provinceItem, { eager: true })
  @Expose({ groups: [MaxGroup] })
  districtItem?: AddressDistrict[];

  @OneToMany(() => OrderAddress, (od) => od.codeWard, { eager: false })
  @Expose({ groups: [MaxGroup] })
  orderAddress?: OrderAddress[];
}
