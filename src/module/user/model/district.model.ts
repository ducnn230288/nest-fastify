import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Address } from '@model';
import { Province, Ward } from '@model';

@Entity()
@Unique(['code'])
export class District extends Base {
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

  @Column({ name: 'code_province' })
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @Expose()
  @IsString()
  codeProvince: string;

  @ManyToOne(() => Province, (province) => province.districtItem, { eager: false })
  @JoinColumn({ name: 'code_province', referencedColumnName: 'code' })
  public provinceItem?: Province;

  @OneToMany(() => Address, (address) => address.districtItem, { eager: false })
  @Expose({ groups: [MaxGroup] })
  item?: Address;

  @OneToMany(() => Ward, (ward) => ward.districtItem, { eager: false })
  @Expose({ groups: [MaxGroup] })
  wardItem?: Ward[];
}
