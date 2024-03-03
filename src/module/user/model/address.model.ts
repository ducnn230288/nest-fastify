import { AddressDistrict, AddressProvince, AddressWard, User } from '@model';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Exclude, Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';

@Entity({ schema: 'user' })
export class Address extends Base {
  @Column() // { name: 'code_province' }
  @IsString()
  @ApiProperty({ example: faker.location.countryCode('alpha-2'), description: '' })
  codeProvince: string;

  @ManyToOne(() => AddressProvince, (province) => province.items, { eager: false })
  @JoinColumn({ name: 'codeProvince', referencedColumnName: 'code' })
  public provinceItem: AddressProvince;

  @Column() // { name: 'code_district' }
  @IsString()
  @ApiProperty({ example: faker.string.alpha({ length: 4, casing: 'upper', exclude: ['A'] }), description: '' })
  codeDistrict: string;

  @ManyToOne(() => AddressDistrict, (district) => district.item, { eager: true })
  @JoinColumn({ name: 'codeDistrict', referencedColumnName: 'code' })
  public districtItem: AddressDistrict;

  @Column() // { name: 'code_ward' }
  @IsString()
  @ApiProperty({ example: faker.string.alpha({ length: 4, casing: 'upper', exclude: ['A'] }), description: '' })
  codeWard: string;

  @ManyToOne(() => AddressWard, (ward) => ward.item, { eager: true })
  @JoinColumn({ name: 'codeWard', referencedColumnName: 'code' })
  public wardItem: AddressWard;

  @Column() // { name: 'specific_address' }
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  specificAddress: string;

  @Column() // { name: 'user_id' }
  @IsString()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  userId?: string;

  @ManyToOne(() => User, (user) => user.address, { eager: true })
  @JoinColumn({ name: 'userId' })
  @Type(() => User)
  readonly user: User;
}
