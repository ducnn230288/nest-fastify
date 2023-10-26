import { District, Province, User } from '@model';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Exclude, Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Ward } from '@model';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Address extends Base {
  @Column()
  @IsString()
  @ApiProperty({ example: faker.location.countryCode('alpha-2'), description: '' })
  codeProvince: string;

  @ManyToOne(() => Province, (province) => province.items, { eager: false })
  @JoinColumn({ name: 'codeProvince', referencedColumnName: 'code' })
  public provinceItem: Province;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.string.alpha({ length: 4, casing: 'upper', exclude: ['A'] }), description: '' })
  codeDistrict: string;

  @ManyToOne(() => District, (district) => district.item, { eager: true })
  @JoinColumn({ name: 'codeDistrict', referencedColumnName: 'code' })
  public districtItem: District;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.string.alpha({ length: 4, casing: 'upper', exclude: ['A'] }), description: '' })
  codeWard: string;

  @ManyToOne(() => Ward, (ward) => ward.item, { eager: true })
  @JoinColumn({ name: 'codeWard', referencedColumnName: 'code' })
  public wardItem: Ward;

  @Column()
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  specificAddress: string;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  userId?: string;

  @ManyToOne(() => User, (user) => user.address, { eager: true })
  @Type(() => User)
  readonly user: User;
}
