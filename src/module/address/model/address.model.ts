import { District, Province, User } from '@model';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@shared';
import { Exclude, Expose, Type } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Ward } from './ward.model';
import { IsOptional, IsString } from 'class-validator';

@Entity()
export class Address extends Base {
  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsString()
  provinceId: string;

  @OneToOne(() => Province)
  @JoinColumn()
  province: Province;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsString()
  districtId: string;

  @OneToOne(() => District)
  @JoinColumn()
  district: District;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsString()
  wardId: string;

  @OneToOne(() => Ward)
  @JoinColumn()
  ward: Ward;

  @Column()
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  specificAddress: string;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  userId?: string;

  @ManyToOne(() => User, (user) => user.address, { eager: true })
  @Type(() => User)
  readonly user: User;
}
