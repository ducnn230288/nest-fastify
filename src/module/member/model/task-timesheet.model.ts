import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDateString, IsString, IsUUID, IsOptional } from 'class-validator';

import { TaskWork, User } from '@model';
import { Base } from '@shared';

@Entity({ schema: 'member' })
export class TaskTimesheet extends Base {
  @Column()
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  start?: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.date.future(), description: '' })
  @IsDateString()
  finish?: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  note?: string;

  @Column()
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  readonly userId?: string;

  @ManyToOne(() => User, (user) => user.timesheet, { eager: true })
  @JoinColumn()
  @Type(() => User)
  user?: User;

  @OneToMany(() => TaskWork, (data) => data.timesheet)
  @Type(() => TaskWork)
  works?: TaskWork[];
}
