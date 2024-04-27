import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

import { CodeType, User } from '@model';
import { Base } from '@shared';

@Entity({ schema: 'core' })
@Unique(['code'])
export class Code extends Base {
  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  code: string;

  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @MaxLength(100)
  type: string;

  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description?: string;

  @ManyToOne(() => CodeType, (codeType) => codeType.items, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  public item?: CodeType;

  @OneToMany(() => User, (user) => user.position)
  @JoinColumn({ name: 'position_code', referencedColumnName: 'code' })
  @Type(() => User)
  users?: User[];
}
