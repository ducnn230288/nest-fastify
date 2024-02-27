import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

import { Base } from '@shared';
import { User } from '@model';

@Entity({ schema: 'member' })
export class UserTeam extends Base {
  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description: string;

  @ManyToOne(() => User, (user) => user.managers, { eager: true }) //
  @Type(() => User)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @Column({ nullable: true, name: 'manager_id' })
  @IsUUID()
  @IsOptional()
  managerId?: string;

  @ManyToMany(() => User, (user) => user.teams)
  @Type(() => User)
  users?: User[];
}
