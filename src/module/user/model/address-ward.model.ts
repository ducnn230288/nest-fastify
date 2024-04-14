import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Address, AddressDistrict, OrderAddress } from '@model';

@Entity({ schema: 'user' })
@Unique(['code'])
export class AddressWard extends Base {
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

  @Column()
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @Expose()
  @IsString()
  codeDistrict: string;

  @ManyToOne(() => AddressDistrict, (district) => district.wardItem, { eager: false })
  @JoinColumn({ name: 'code_district', referencedColumnName: 'code' })
  public districtItem?: AddressDistrict;

  @OneToMany(() => Address, (address) => address.wardItem, { eager: false })
  @Expose({ groups: [MaxGroup] })
  item?: Address;

  @OneToMany(() => OrderAddress, (od) => od.codeWard, { eager: false })
  @Expose({ groups: [MaxGroup] })
  orderAddress?: OrderAddress[];
}
