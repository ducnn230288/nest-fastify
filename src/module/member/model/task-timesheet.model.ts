import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDateString, IsString, IsUUID, IsOptional } from 'class-validator';

import { DayOff, TaskWork, User } from '@model';
import { Base, MaxGroup } from '@shared';

@Entity()
export class TaskTimesheet extends Base {
  @Column()
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  start?: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.date.future(), description: '' })
  @IsDateString()
  finish?: Date;

  @Column({ name: 'code_day_off', nullable: true })
  @ApiProperty({ example: faker.string.numeric({ length: { min: 5, max: 20 } }), description: '' })
  @IsString()
  @IsOptional()
  codeDayOff?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  note?: string;

  @OneToOne(() => DayOff, (data) => data.taskTimesheet)
  @JoinColumn({ name: 'code_day_off', referencedColumnName: 'code' })
  @Type(() => DayOff)
  readonly dayOff?: DayOff;

  @Column({ name: 'user_id' })
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  readonly userId?: string;

  @ManyToOne(() => User, (user) => user.timesheet, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @Type(() => User)
  readonly user?: User;

  @OneToMany(() => TaskWork, (data) => data.taskId)
  @Type(() => TaskWork)
  readonly works?: TaskWork[];
}
