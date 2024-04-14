import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Address } from '@model';
import { AddressProvince, AddressWard } from '@model';

@Entity({ schema: 'user' })
@Unique(['code'])
export class AddressDistrict extends Base {
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
  codeProvince: string;

  @ManyToOne(() => AddressProvince, (province) => province.districtItem, { eager: false })
  @JoinColumn({ name: 'code_province', referencedColumnName: 'code' })
  public provinceItem?: AddressProvince;

  @OneToMany(() => Address, (address) => address.districtItem, { eager: false })
  @Expose({ groups: [MaxGroup] })
  item?: Address;

  @OneToMany(() => AddressWard, (ward) => ward.districtItem, { eager: false })
  @Expose({ groups: [MaxGroup] })
  wardItem?: AddressWard[];
}
