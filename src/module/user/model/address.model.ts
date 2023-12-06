import { District, Province, User } from '@model';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Exclude, Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Ward, OrderAddress } from '@model';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Address extends Base {
  @Column({ name: 'code_province' })
  @IsString()
  @ApiProperty({ example: faker.location.countryCode('alpha-2'), description: '' })
  codeProvince: string;

  @ManyToOne(() => Province, (province) => province.items, { eager: false })
  @JoinColumn({ name: 'code_province', referencedColumnName: 'code' })
  public provinceItem: Province;

  @Column({ name: 'code_district' })
  @IsString()
  @ApiProperty({ example: faker.string.alpha({ length: 4, casing: 'upper', exclude: ['A'] }), description: '' })
  codeDistrict: string;

  @ManyToOne(() => District, (district) => district.item, { eager: true })
  @JoinColumn({ name: 'code_district', referencedColumnName: 'code' })
  public districtItem: District;

  @Column({ name: 'code_ward' })
  @IsString()
  @ApiProperty({ example: faker.string.alpha({ length: 4, casing: 'upper', exclude: ['A'] }), description: '' })
  codeWard: string;

  @ManyToOne(() => Ward, (ward) => ward.item, { eager: true })
  @JoinColumn({ name: 'code_ward', referencedColumnName: 'code' })
  public wardItem: Ward;

  @Column({ name: 'specific_address' })
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  specificAddress: string;

  @Column({ name: 'user_id' })
  @IsString()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  userId?: string;

  @ManyToOne(() => User, (user) => user.address, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @Type(() => User)
  readonly user: User;

  @OneToMany(() => OrderAddress, (od) => od.codeWard, { eager: false })
  @Expose({ groups: [MaxGroup] })
  orderAddress?: OrderAddress[];
}
