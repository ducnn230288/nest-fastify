import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

import { User } from '@model';
import { Base } from '@shared';

@Entity({ schema: 'user' })
@Unique(['code'])
export class UserRole extends Base {
  @Column()
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @IsString()
  code: string;

  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isSystemAdmin: boolean;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  readonly permissions?: string[];

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
