import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Address } from '@model';
import { District } from '@model';

@Entity()
@Unique(['code'])
export class Province extends Base {
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

  @OneToMany(() => District, (district) => district.provinceItem, { eager: true })
  @Expose({ groups: [MaxGroup] })
  districtItem?: District[];
}
