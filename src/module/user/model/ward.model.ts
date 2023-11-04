import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Address } from '@model';
import { District } from '@model';

@Entity()
@Unique(['code'])
export class Ward extends Base {
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

  @Column({ name: 'code_district' })
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @Expose()
  @IsString()
  codeDistrict: string;

  @ManyToOne(() => District, (district) => district.wardItem, { eager: false })
  @JoinColumn({ name: 'code_district', referencedColumnName: 'code' })
  public districtItem?: District;

  @OneToMany(() => Address, (address) => address.wardItem, { eager: false })
  @Expose({ groups: [MaxGroup] })
  item?: Address;
}
